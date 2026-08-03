'use client';

import { useState } from 'react';

type FoodId = 'drinks1' | 'bread1' | 'icecream1' | 'chips1' | 'shake1';

type FoodData = {
  img: string;
  name: string;
  price: string;
  desc: string;
};

const FOOD_DATA: Record<FoodId, FoodData> = {
  drinks1: {
    img: '/store/drinks.png',
    name: '빨간포션 & 파란포션',
    price: '각 6500원',
    desc: '마시는 순간 에너지 회복!\n붉은 약초와 푸른 약초로 만든 게임 속 포션들을\n실제로 경험해 보세요',
  },
  bread1: {
    img: '/store/bread.png',
    name: '주황버섯 누텔라 치즈빵',
    price: '5000원',
    desc: '주황버섯 모양의 귀여운 빵 속에 달콤한 누텔라와 고소한 치즈가 듬뿍!\n메이플 감성을 한입에 느낄 수 있어요',
  },
  icecream1: {
    img: '/store/icecream.png',
    name: '핑크빈 선데이\n아이스크림',
    price: '6500원',
    desc: '상큼한 딸기 젤라또와 부드러운 아이스크림에\n귀여운 핑크빈 초콜릿과 알록달록한 스프링클을 톡톡!',
  },
  chips1: {
    img: '/store/chips.png',
    name: '메이플 웨지바스켓',
    price: '8000원',
    desc: '바삭한 감자 웻지에 고소한 치즈 소스를 듬뿍 곁들인 메이플 웻지바스켓!\n입 안에 메이플의 축제를 담아보세요',
  },
  shake1: {
    img: '/store/shake.png',
    name: '예티의 초코멜로\n쉐이크츄',
    price: '8000원',
    desc: '진한 밀크 쉐이크에 에타를 닮은 하얀 마시멜로와\n츄러스가 올라가 더욱 달콤해요!\n',
  },
};

const FOOD_ITEMS: { id: FoodId; alt: string }[] = [
  { id: 'drinks1',   alt: '음료' },
  { id: 'bread1',    alt: '빵' },
  { id: 'icecream1', alt: '아이스크림' },
  { id: 'chips1',    alt: '과자' },
  { id: 'shake1',    alt: '쉐이크' },
];

type Props = { onClose: () => void };

export function StorePopup({ onClose }: Props) {
  const [active, setActive] = useState<FoodId>('drinks1');
  const data = FOOD_DATA[active];

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

        {/* 음식 콘텐츠 */}
        <div className="absolute top-[13vh] left-[3vw] right-[3vw] bottom-[22vh] flex items-center gap-[2vw] pointer-events-none">
            {/* 왼쪽: 원형 이미지 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.img} alt={data.name} draggable={false} className="shrink-0 w-[17.6vw] h-auto" />

            {/* 오른쪽: 텍스트 */}
            <div className="flex flex-col items-start gap-[2vh] mt-[5vh]">
              <h3 className="font-cookierun font-bold text-[2.2vw] leading-tight tracking-tight text-[#6c4886] whitespace-pre-line">
                {data.name}
              </h3>
              <p className="font-cookierun font-bold text-[1.55vw] text-[#dd5e89] leading-none tracking-tight">
                {data.price}
              </p>
              <p className="font-pretendard font-medium text-[1.15vw] text-[#000] leading-normal tracking-tight whitespace-pre-line mt-[0.5vh]">
                {data.desc}
              </p>
            </div>
        </div>

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
