'use client';

import { useState } from 'react';

type FoodId = 'drinks1' | 'bread1' | 'icecream1' | 'chips1' | 'shake1';

const FOOD_ITEMS: { id: FoodId; alt: string }[] = [
  { id: 'drinks1',  alt: '음료' },
  { id: 'bread1',   alt: '빵' },
  { id: 'icecream1',alt: '아이스크림' },
  { id: 'chips1',   alt: '과자' },
  { id: 'shake1',   alt: '쉐이크' },
];

type Props = { onClose: () => void };

export function StorePopup({ onClose }: Props) {
  const [active, setActive] = useState<FoodId>('drinks1');

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start bg-black/50">
      <div className="relative mt-[10vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/popup_bg.png" alt="store popup" draggable={false} style={{ width: '46.88vw', height: '69.72vh' }} />

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-[13.5vh] right-[1.6vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/closeBtn.png" alt="close" draggable={false} style={{ width: '4.48vw', height: '6.30vh' }} />
        </button>

        {/* 하단 음식 버튼 */}
        <div className="absolute bottom-[3vh] left-0 right-0 flex justify-center items-center gap-[1.5vw]">
          {FOOD_ITEMS.map(({ id, alt }) => {
            const isActive = active === id;
            return (
              <div
                key={id}
                className="relative flex items-center justify-center overflow-visible"
                style={{ width: '7.19vw' }}
              >
                {/* star — 항상 동일 크기, 음식 이미지 영역 밖으로도 삐져나옴 */}
                {isActive && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/store/star.png"
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="pointer-events-none"
                    style={{
                      position: 'absolute',
                      width: '7.19vw',
                      height: 'auto',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                <button
                  onClick={() => setActive(id)}
                  className="relative transition-transform hover:scale-105"
                  style={{ opacity: isActive ? 1 : 0.25 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/store/${id}.png`}
                    alt={alt}
                    draggable={false}
                    style={{ height: '11.5vh', width: 'auto' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
