'use client';

type Props = { onClose: () => void };

export function CastlePopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start bg-black/50">
      <div className="relative mt-[10vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/popup_bg.png" alt="castle popup" draggable={false} style={{ width: '46.88vw', height: '69.72vh' }} />
        <button
          onClick={onClose}
          className="absolute top-[13.5vh] right-[1.6vw]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/closeBtn.png" alt="close" draggable={false} style={{ width: '4.48vw', height: '6.30vh' }} />
        </button>

        {/* 팝업 콘텐츠 */}
        <div className="absolute inset-0 px-[3.5vw] pt-[14vh] flex flex-col items-center text-center pointer-events-none">
          <h2 className="font-cookierun font-bold text-[3vw] leading-none tracking-tight text-[#6c4886] mt-[5.5vh]">
            매직캐슬 미디어맵핑 쇼
          </h2>

          <div className="flex flex-col items-start mt-[4.5vh]">
            {/* 시간 */}
            <div className="flex items-start gap-[2.5vw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/time.png" alt="시간" draggable={false} className="w-[6.5vw] h-auto shrink-0" />
              <p className="font-pretendard font-medium text-[1.5vw] text-left leading-normal tracking-tight text-[#000]">
                18:30 ~ 20:00<br />
                1분 20초 영상 반복 재생
              </p>
            </div>

            {/* 위치 */}
            <div className="flex items-center gap-[2.5vw] mt-[2.3vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/location.png" alt="위치" draggable={false} className="w-[6.5vw] h-auto shrink-0" />
              <p className="font-pretendard font-medium text-[1.5vw] text-left leading-none tracking-tight text-[#000]">
                매직아일랜드 매직캐슬
              </p>
            </div>
          </div>

          {/* 하단 보라색 영역 텍스트 */}
          <div className="absolute bottom-[3.2vh] left-0 right-0 flex justify-center pointer-events-none">
            <div
              className="flex flex-col items-center justify-center w-[25.68vw] h-[10.09vh] bg-no-repeat bg-[length:100%_100%]"
              style={{ backgroundImage: "url('/Twinkle.png')" }}
            >
              <p className="font-cookierun font-Regular text-[1.4vw] text-[#fff075] leading-normal tracking-tight text-center">
                화려하고 재밌는 영상과 함께<br />반짝이는 공연을 즐겨보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
