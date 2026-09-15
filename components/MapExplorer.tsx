'use client';

import { useRef, useEffect, useLayoutEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const SVG_W = 3884;
const SVG_H = 2165.52;
const START_X_RATIO = 300 / 1920;

// 관성 정도
const INERTIA = 180;

type LayerId =
  | 'Castle'
  | 'Jyrospin'
  | 'RollerCoater'
  | 'Store';

type Props = {
  svgContent: string;

  navigateRef?: React.MutableRefObject<
    ((svgX: number, svgY: number) => void) | null
  >;

  onLayerClick?: (layer: LayerId) => void;

  // 현재 화면 중앙에 위치한 SVG 좌표
  onPositionChange?: (
    svgX: number,
    svgY: number
  ) => void;
};

const CLICKABLE_LAYERS: LayerId[] = [
  'Castle',
  'Jyrospin',
  'RollerCoater',
  'Store',
];

export function MapExplorer({
  svgContent,
  navigateRef,
  onLayerClick,
  onPositionChange,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  // 드래그 시작 당시 맵 위치
  const dragStartRef = useRef({
    x: 0,
    y: 0,
  });

  // 클릭한 Layer 저장
  const pendingLayerClick =
    useRef<LayerId | null>(null);

  // ─────────────────────────────
  // 현재 화면 중앙의 SVG 좌표
  // ─────────────────────────────
  function updateCurrentPosition(
    mapX: number,
    mapY: number
  ) {
    const vw =
      containerRef.current?.clientWidth ??
      window.innerWidth;

    const vh =
      containerRef.current?.clientHeight ??
      window.innerHeight;

    const svgX = vw / 2 - mapX;
    const svgY = vh / 2 - mapY;

    onPositionChange?.(
      svgX,
      svgY
    );
  }

  // ─────────────────────────────
  // 맵 이동 범위 제한
  // ─────────────────────────────
  function clamp({
    x,
    y,
  }: {
    x: number;
    y: number;
  }) {
    const vw =
      containerRef.current?.clientWidth ?? 0;

    const vh =
      containerRef.current?.clientHeight ?? 0;

    return {
      x:
        SVG_W > vw
          ? Math.min(
              0,
              Math.max(
                x,
                vw - SVG_W
              )
            )
          : (vw - SVG_W) / 2,

      y:
        SVG_H > vh
          ? Math.min(
              0,
              Math.max(
                y,
                vh - SVG_H
              )
            )
          : (vh - SVG_H) / 2,
    };
  }

  // ─────────────────────────────
  // Spring
  // ─────────────────────────────
  const [{ x, y }, api] =
    useSpring(() => ({
      x: 0,
      y: 0,

      onChange: ({
        value,
      }) => {
        updateCurrentPosition(
          value.x,
          value.y
        );
      },
    }));

  // ─────────────────────────────
  // 최초 위치
  // ─────────────────────────────
  useLayoutEffect(() => {
    const vw =
      containerRef.current?.clientWidth ??
      window.innerWidth;

    const vh =
      containerRef.current?.clientHeight ??
      window.innerHeight;

    const ix =
      SVG_W > vw
        ? Math.min(
            0,
            (vw - SVG_W) / 2 +
              START_X_RATIO * vw
          )
        : (vw - SVG_W) / 2 +
          START_X_RATIO * vw;

    const iy =
      SVG_H > vh
        ? vh - SVG_H
        : (vh - SVG_H) / 2;

    api.set({
      x: ix,
      y: iy,
    });

    updateCurrentPosition(
      ix,
      iy
    );
  }, [api]);

  // ─────────────────────────────
  // NavBar → 특정 SVG 위치 이동
  // ─────────────────────────────
  function navigateTo(
    svgX: number,
    svgY: number
  ) {
    const vw =
      containerRef.current?.clientWidth ??
      window.innerWidth;

    const vh =
      containerRef.current?.clientHeight ??
      window.innerHeight;

    const target =
      clamp({
        x: vw / 2 - svgX,
        y: vh / 2 - svgY,
      });

    api.start({
      x: target.x,
      y: target.y,

      config: {
        tension: 120,
        friction: 32,
        mass: 1,
      },
    });
  }

  // ─────────────────────────────
  // NavBar에 navigate 함수 전달
  // ─────────────────────────────
  useEffect(() => {
    if (navigateRef) {
      navigateRef.current =
        navigateTo;
    }

    return () => {
      if (navigateRef) {
        navigateRef.current =
          null;
      }
    };
  }, [navigateRef]);

  // ─────────────────────────────
  // Drag
  // ─────────────────────────────
  useDrag(
    ({
      first,
      last,
      tap,
      movement: [mx, my],
      velocity: [vx, vy],
      direction: [dx, dy],
    }) => {
      // ─────────────────────────
      // 드래그 시작
      // ─────────────────────────
      if (first) {
        // 기존 관성 정지
        api.stop();

        // 현재 맵 위치 저장
        dragStartRef.current = {
          x: x.get(),
          y: y.get(),
        };
      }

      // 드래그 시작 위치
      const ox =
        dragStartRef.current.x;

      const oy =
        dragStartRef.current.y;

      // 현재 이동량을 더함
      const rawX =
        ox + mx;

      const rawY =
        oy + my;

      // ─────────────────────────
      // 드래그 종료
      // ─────────────────────────
      if (last) {
        // 클릭이면 Layer 실행
        if (
          tap &&
          pendingLayerClick.current
        ) {
          onLayerClick?.(
            pendingLayerClick.current
          );
        }

        pendingLayerClick.current =
          null;

        // 드래그였으면 관성 적용
        if (!tap) {
          const target =
            clamp({
              x:
                rawX +
                vx *
                  dx *
                  INERTIA,

              y:
                rawY +
                vy *
                  dy *
                  INERTIA,
            });

          api.start({
            x: target.x,
            y: target.y,

            config: {
              tension: 70,
              friction: 24,
              mass: 1.1,
            },
          });
        }

        return;
      }

      // ─────────────────────────
      // 드래그 중
      // ─────────────────────────
      const target =
        clamp({
          x: rawX,
          y: rawY,
        });

      // 즉시 따라오기
      api.start({
        x: target.x,
        y: target.y,
        immediate: true,
      });
    },
    {
      target: containerRef,

      // 5px 이하 움직임은 클릭
      tapsThreshold: 5,

      // 클릭 이벤트가 너무 빨리 잡히는 것 방지
      filterTaps: true,

      pointer: {
        capture: false,
      },
    }
  );

  // ─────────────────────────────
  // Pointer Down
  // ─────────────────────────────
  function onPointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    const target =
      e.target as Element;

    // 어떤 Layer를 클릭했는지 저장
    pendingLayerClick.current =
      CLICKABLE_LAYERS.find(
        (id) =>
          target.closest(
            `#${id}`
          )
      ) ?? null;

    // pointer capture
    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  }

  // ─────────────────────────────
  // Resize
  // ─────────────────────────────
  useEffect(() => {
    function onResize() {
      const target =
        clamp({
          x: x.get(),
          y: y.get(),
        });

      api.set(target);

      updateCurrentPosition(
        target.x,
        target.y
      );
    }

    window.addEventListener(
      'resize',
      onResize
    );

    return () => {
      window.removeEventListener(
        'resize',
        onResize
      );
    };
  }, [api, x, y]);

  // ─────────────────────────────
  // Render
  // ─────────────────────────────
  return (
    <div
      ref={containerRef}
      className="
        w-screen
        h-screen
        overflow-hidden
        bg-neutral-900
        select-none
        cursor-grab
        active:cursor-grabbing
      "
      onPointerDown={
        onPointerDown
      }
    >
      <animated.div
        style={{
          position: 'absolute',
          x,
          y,
          willChange: 'transform',
        }}
      >
        <div
          className="relative"
          style={{
            width: SVG_W,
            height: SVG_H,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bg.jpg"
            alt=""
            draggable={false}
            aria-hidden="true"
            className="
              absolute
              inset-0
              block
              max-w-none
              w-full
              h-full
              object-fill
            "
          />

          <div
            className="relative"
            dangerouslySetInnerHTML={{
              __html: svgContent,
            }}
          />
        </div>
      </animated.div>
    </div>
  );
}