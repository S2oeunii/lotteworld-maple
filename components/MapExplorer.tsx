'use client';

import { useRef, useEffect, useLayoutEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

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
  const pendingLayerClick = useRef<LayerId | null>(null);

  function clamp(raw: { x: number; y: number }) {
    const vw = containerRef.current?.clientWidth ?? 0;
    const vh = containerRef.current?.clientHeight ?? 0;
    return {
      x: SVG_W > vw ? Math.min(0, Math.max(raw.x, vw - SVG_W)) : (vw - SVG_W) / 2,
      y: SVG_H > vh ? Math.min(0, Math.max(raw.y, vh - SVG_H)) : (vh - SVG_H) / 2,
    };
  }

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ix = SVG_W > vw ? Math.min(0, (vw - SVG_W) / 2 + START_X_RATIO * vw) : (vw - SVG_W) / 2 + START_X_RATIO * vw;
    const iy = SVG_H > vh ? vh - SVG_H : (vh - SVG_H) / 2;
    api.set({ x: ix, y: iy });
  }, [api]);

  function navigateTo(svgX: number, svgY: number) {
    const vw = containerRef.current?.clientWidth ?? window.innerWidth;
    const vh = containerRef.current?.clientHeight ?? window.innerHeight;
    const target = clamp({ x: vw / 2 - svgX, y: vh / 2 - svgY });
    api.start({ x: target.x, y: target.y, config: { tension: 170, friction: 40 } });
  }

  useEffect(() => {
    if (navigateRef) navigateRef.current = navigateTo;
  });

  const bind = useDrag(
    ({ event, first, last, tap, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy], memo }) => {
      if (first) {
        api.stop();
        const target = event.target as Element;
        pendingLayerClick.current = CLICKABLE_LAYERS.find((id) => target.closest(`#${id}`)) ?? null;
        if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = 'none';
        memo = { x: x.get(), y: y.get() };
      }

      const rawX = (memo as { x: number; y: number }).x + mx;
      const rawY = (memo as { x: number; y: number }).y + my;

      if (last) {
        if (svgWrapRef.current) svgWrapRef.current.style.pointerEvents = '';
        if (tap && pendingLayerClick.current) {
          onLayerClick?.(pendingLayerClick.current);
        }
        pendingLayerClick.current = null;

        const INERTIA = 350;
        const target = clamp({ x: rawX + vx * dx * INERTIA, y: rawY + vy * dy * INERTIA });
        api.start({ x: target.x, y: target.y, config: { tension: 90, friction: 24 } });
      } else {
        api.set(clamp({ x: rawX, y: rawY }));
      }

      return memo;
    },
    { filterTaps: true, tapsThreshold: 5 }
  );

  useEffect(() => {
    function onResize() {
      api.set(clamp({ x: x.get(), y: y.get() }));
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-neutral-900 select-none cursor-grab active:cursor-grabbing"
      {...bind()}
    >
      <animated.div
        style={{
          position: 'absolute',
          x,
          y,
          willChange: 'transform',
        }}
      >
        <div className="relative" style={{ width: SVG_W, height: SVG_H }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bg.jpg"
            alt=""
            draggable={false}
            aria-hidden="true"
            className="absolute inset-0 block max-w-none w-full h-full object-fill"
          />
          <div
            ref={svgWrapRef}
            className="relative"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </animated.div>
    </div>
  );
}
