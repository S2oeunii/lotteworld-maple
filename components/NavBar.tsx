'use client';

import Image from 'next/image';

const NAV_ITEMS = [
  {
    src: '/nav1.png',
    alt: 'nav1',
    svgX: 1900,
    svgY: 550,
  },
  {
    src: '/nav2.png',
    alt: 'nav2',
    svgX: 2935,
    svgY: 680,
  },
  {
    src: '/nav3.png',
    alt: 'nav3',
    svgX: 870,
    svgY: 600,
  },
  {
    src: '/nav4.png',
    alt: 'nav4',
    svgX: 3160,
    svgY: 1300,
  },
];

type Props = {
  onNavClick: (svgX: number, svgY: number) => void;
  currentSvgX: number;
  currentSvgY: number;
};

export function NavBar({
  onNavClick,
  currentSvgX,
  currentSvgY,
}: Props) {
  // 이 거리 안에 들어오면 바로 100%로 활성화
  const ACTIVE_DISTANCE = 300;

  return (
    <div className="fixed right-[3vw] top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center justify-around w-[4.69vw] h-[40.74vh] rounded-[2.34vw] bg-white/70 py-[1.85vh]">
        {NAV_ITEMS.map((item, i) => {
          const distance = Math.sqrt(
            Math.pow(currentSvgX - item.svgX, 2) +
            Math.pow(currentSvgY - item.svgY, 2)
          );

          // 가까우면 바로 100%, 멀면 35%
          const opacity =
            distance <= ACTIVE_DISTANCE ? 1 : 0.35;

          return (
            <button
              key={i}
              onClick={() =>
                onNavClick(item.svgX, item.svgY)
              }
              className="flex items-center justify-center w-[3.75vw] h-[6.67vh] rounded-full hover:scale-110 active:scale-95 cursor-pointer"
              style={{
                opacity,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={64}
                height={64}
                className="object-contain w-[3.33vw] h-[5.93vh]"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}