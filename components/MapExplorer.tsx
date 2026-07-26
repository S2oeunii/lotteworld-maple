'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';

const SVG_W = 3884;
const SVG_H = 2165.52;
const START_X_RATIO = 300 / 1920;

export function MapExplorer({ svgContent }: { svgContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

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

  function isCastleTarget(target: EventTarget | null): boolean {
    const castle = svgWrapRef.current?.querySelector('#Castle');
    return !!castle?.contains(target as Node);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Castle 위 클릭은 드래그 시작 안 함
    if (isCastleTarget(e.target)) return;

    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    // 드래그 중 CSS hover 감지 차단 → Castle_hover 깜빡임 방지
    if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = 'none';
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => clamp({ x: prev.x + dx, y: prev.y + dy }));
  }

  function onPointerUp() {
    dragging.current = false;
    // 드래그 끝나면 hover 복원
    if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = '';
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
