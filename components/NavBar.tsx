'use client';

import Image from 'next/image';
import { useState } from 'react';

const NAV_ITEMS = [
  { src: '/nav1.png', alt: 'nav1', svgX: 1900, svgY: 550 },
  { src: '/nav2.png', alt: 'nav2', svgX: 2935, svgY: 680 },
  { src: '/nav3.png', alt: 'nav3', svgX: 870, svgY: 600 },
  { src: '/nav4.png', alt: 'nav4', svgX: 3160, svgY: 1300 },
];

type Props = {
  onNavClick: (svgX: number, svgY: number) => void;
};

export function NavBar({ onNavClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-[3vw] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-[1vh]">
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="cursor-pointer w-[4.69vw] h-[3.5vh] flex items-center justify-center bg-white/70 rounded-full transition-colors hover:bg-white/90"
      >
        <span
          className="text-[#6c4886] text-[1.2vw] leading-none transition-transform duration-300 inline-block"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          ▼
        </span>
      </button>

      {/* 네비바 */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: isOpen ? '44vh' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="flex flex-col items-center justify-around w-[4.69vw] h-[40.74vh] rounded-[2.34vw] bg-white/70 py-[1.85vh]">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={i}
              onClick={() => onNavClick(item.svgX, item.svgY)}
              className="flex items-center justify-center w-[3.75vw] h-[6.67vh] rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer"
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
          ))}
        </div>
      </div>
    </div>
  );
}
