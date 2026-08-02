'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';

const SVG_W = 3884;
const SVG_H = 2165.52;
const START_X_RATIO = 300 / 1920;

type LayerId = 'Castle' | 'Jyrospin' | 'RollerCoater' | 'Store';

type Props = {
  svgContent: string;
  navigateRef?: React.MutableRefObject<((svgX: number, svgY: number) => void) | null>;
  onLayerClick?: (layer: LayerId) => void;
};

const CLICKABLE_LAYERS: LayerId[] = ['Castle', 'Jyrospin', 'RollerCoater', 'Store'];

export function MapExplorer({ svgContent, navigateRef, onLayerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const translateDivRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);
  const pendingLayerClick = useRef<LayerId | null>(null);

  function clamp(raw: { x: number; y: number }) {
    const vw = containerRef.current?.clientWidth ?? 0;
    const vh = containerRef.current?.clientHeight ?? 0;
    return {
      x: SVG_W > vw ? Math.min(0, Math.max(raw.x, vw - SVG_W)) : (vw - SVG_W) / 2,
      y: SVG_H > vh ? Math.min(0, Math.max(raw.y, vh - SVG_H)) : (vh - SVG_H) / 2,
    };
  }

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = SVG_W > vw ? Math.min(0, (vw - SVG_W) / 2 + START_X_RATIO * vw) : (vw - SVG_W) / 2 + START_X_RATIO * vw;
    const y = SVG_H > vh ? vh - SVG_H : (vh - SVG_H) / 2;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset({ x, y });
  }, []);

  function navigateTo(svgX: number, svgY: number) {
    const vw = containerRef.current?.clientWidth ?? window.innerWidth;
    const vh = containerRef.current?.clientHeight ?? window.innerHeight;
    const target = clamp({ x: vw / 2 - svgX, y: vh / 2 - svgY });
    if (translateDivRef.current) {
      translateDivRef.current.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
    }
    setOffset(target);
    setTimeout(() => {
      if (translateDivRef.current) translateDivRef.current.style.transition = '';
    }, 700);
  }

  useEffect(() => {
    if (navigateRef) navigateRef.current = navigateTo;
  });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (translateDivRef.current) translateDivRef.current.style.transition = '';
    // pointer-events:none 설정 전에 클릭 레이어 미리 확인
    const target = e.target as Element;
    pendingLayerClick.current =
      CLICKABLE_LAYERS.find((id) => target.closest(`#${id}`)) ?? null;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    dragDistance.current = 0;
    lastPos.current = { x: e.clientX, y: e.clientY };
    // 드래그 중 CSS hover 감지 차단 → Castle_hover 깜빡임 방지
    if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = 'none';
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    dragDistance.current += Math.sqrt(dx * dx + dy * dy);
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => clamp({ x: prev.x + dx, y: prev.y + dy }));
  }

  function onPointerUp() {
    dragging.current = false;
    // 드래그 끝나면 hover 복원
    if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = '';
    // 드래그 없이 레이어 눌렀으면 팝업 열기
    if (pendingLayerClick.current && dragDistance.current <= 5) {
      onLayerClick?.(pendingLayerClick.current);
    }
    pendingLayerClick.current = null;
  }

  useEffect(() => {
    function onResize() {
      setOffset((prev) => clamp(prev));
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-neutral-900 select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={translateDivRef}
        style={{
          position: 'absolute',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          willChange: 'transform',
        }}
      >
        <div className="relative" style={{ width: SVG_W, height: SVG_H }}>
          {/* 배경 사진 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bg.jpg"
            alt=""
            draggable={false}
            aria-hidden="true"
            className="absolute inset-0 block max-w-none w-full h-full object-fill"
          />
          {/* 인라인 SVG */}
          <div
            ref={svgWrapRef}
            className="relative"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </div>
    </div>
  );
}
