'use client';

import {
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
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

  // ─────────────────────────────
  // 현재 드래그 시작 위치
  // ─────────────────────────────
  const dragStartRef = useRef({
    x: 0,
    y: 0,
  });

  // ─────────────────────────────
  // 클릭 시작 시 어떤 Layer였는지
  // ─────────────────────────────
  const clickedLayerRef =
    useRef<LayerId | null>(null);

  // 실제로 드래그가 발생했는지
  const didDragRef =
    useRef(false);

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
  // NavBar → 특정 SVG 좌표 이동
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

    const target = clamp({
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
    if (!navigateRef) return;

    navigateRef.current =
      navigateTo;

    return () => {
      navigateRef.current =
        null;
    };
  }, [navigateRef]);

  // ─────────────────────────────
  // Pointer Down
  // ─────────────────────────────
  function handlePointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    const target =
      e.target as Element;

    clickedLayerRef.current =
      CLICKABLE_LAYERS.find(
        (id) =>
          target.closest(
            `#${id}`
          )
      ) ?? null;

    didDragRef.current = false;
  }

  // ─────────────────────────────
  // Pointer Move
  // ─────────────────────────────
  function handlePointerMove(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    // 실제 이동 여부는 useDrag에서 판단
    // 여기서는 아무것도 하지 않음
  }

  // ─────────────────────────────
  // Pointer Up
  // ─────────────────────────────
  function handlePointerUp() {
    // 드래그가 아니었을 때만 클릭 실행
    if (
      !didDragRef.current &&
      clickedLayerRef.current
    ) {
      onLayerClick?.(
        clickedLayerRef.current
      );
    }

    clickedLayerRef.current =
      null;
  }

  // ─────────────────────────────
  // Drag
  // ─────────────────────────────
  useDrag(
    ({
      first,
      last,
      movement: [mx, my],
      velocity: [vx, vy],
      direction: [dx, dy],
    }) => {
      // ─────────────────────────
      // 드래그 시작
      // ─────────────────────────
      if (first) {
        api.stop();

        dragStartRef.current = {
          x: x.get(),
          y: y.get(),
        };

        didDragRef.current = false;
      }

      // 실제로 움직였으면 드래그
      if (
        Math.abs(mx) > 5 ||
        Math.abs(my) > 5
      ) {
        didDragRef.current = true;
      }

      const ox =
        dragStartRef.current.x;

      const oy =
        dragStartRef.current.y;

      // ─────────────────────────
      // 현재 드래그 위치
      // ─────────────────────────
      const rawX =
        ox + mx;

      const rawY =
        oy + my;

      // ─────────────────────────
      // 드래그 종료
      // ─────────────────────────
      if (last) {
        // 드래그였으면 관성
        if (didDragRef.current) {
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

      api.start({
        x: target.x,
        y: target.y,
        immediate: true,
      });
    },
    {
      target: containerRef,

      // 5px 이하 이동은 클릭
      threshold: 5,

      pointer: {
        capture: false,
      },
    }
  );

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
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
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