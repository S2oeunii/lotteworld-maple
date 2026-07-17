'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';

// SVG 원본 크기 (JS 계산용, CSS px 아님)
const SVG_W = 3884;
const SVG_H = 2172.12;
// 1920×1080 기준 초기 x 오프셋 비율
const START_X_RATIO = 300 / 1920;

export function MapExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // 이미지가 원본 크기로 표시되므로 naturalWidth/naturalHeight 기준
  function clamp(raw: { x: number; y: number }) {
    const vw = containerRef.current?.clientWidth ?? 0;
    const vh = containerRef.current?.clientHeight ?? 0;
    const iw = imageRef.current?.naturalWidth ?? SVG_W;
    const ih = imageRef.current?.naturalHeight ?? SVG_H;
    return {
      x: iw > vw ? Math.min(0, Math.max(raw.x, vw - iw)) : (vw - iw) / 2,
      y: ih > vh ? Math.min(0, Math.max(raw.y, vh - ih)) : (vh - ih) / 2,
    };
  }

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setOffset({
      x: SVG_W > vw ? Math.min(0, (vw - SVG_W) / 2 + START_X_RATIO * vw) : (vw - SVG_W) / 2 + START_X_RATIO * vw,
      y: SVG_H > vh ? vh - SVG_H : (vh - SVG_H) / 2,
    });
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
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
        <div className="relative">
          {/* 배경 사진 — svg와 동일 크기로 고정 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bg.jpg"
            alt=""
            draggable={false}
            aria-hidden="true"
            className="absolute inset-0 block max-w-none w-full h-full object-fill"
          />
          {/* 지도 SVG — 자연 크기로 레이어 크기 결정 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src="/bg.svg"
            alt="롯데월드 지도"
            draggable={false}
            className="relative block max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
