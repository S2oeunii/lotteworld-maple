'use client';

type Props = { onClose: () => void };

export function JyrospinPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start bg-black/50">
      <div className="relative mt-[10vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/popup_bg2.png" alt="jyrospin popup" draggable={false} style={{ width: '46.88vw', height: '69.72vh' }} />

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-[13.5vh] right-[1.6vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/closeBtn.png" alt="close" draggable={false} style={{ width: '4.48vw', height: '6.30vh' }} />
        </button>

        {/* 자이로 캐릭터 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/jyro_cha.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute pointer-events-none"
          style={{ width: '11.09vw', height: 'auto', right: '-3.8vw', bottom: '2.3vh', animation: 'dizzy-wobble 1.2s ease-in-out infinite' }}
        />

        {/* 팝업 콘텐츠 */}
        <div className="absolute inset-0 px-[3.5vw] pt-[14vh] flex flex-col items-center text-center pointer-events-none">
          {/* 타이틀 */}
          <h2 className="font-cookierun font-bold text-[3vw] leading-none tracking-tight text-[#6c4886] mt-[5.5vh]">
            자이로스핀
          </h2>

          {/* 설명 */}
          <p className="font-pretendard font-medium text-[1.4vw] text-[#000] mt-[1.5vh] leading-normal tracking-tight">
            360° 회전하는 자이로스핀에서 핑크빈과 함께 짜릿한 모험을 떠나요!
          </p>

          {/* 놀이기구 정보 */}
          <div className="flex flex-col items-start mt-[4vh] gap-[2.3vh]">
            {/* 난이도 */}
            <div className="flex items-center gap-[3vw]">
              <div className="w-[9.74vw] flex justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/level.png" alt="난이도" draggable={false} className="h-[6.85vh] w-auto" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Stars3.png" alt="별 3개" draggable={false} className="w-[9.32vw] h-auto" />
            </div>

            {/* 탑승 시간 */}
            <div className="flex items-center gap-[3vw]">
              <div className="w-[9.74vw] flex justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ridingTime.png" alt="탑승 시간" draggable={false} className="h-[6.67vh] w-auto" />
              </div>
              <p className="font-cookierun font-Regular text-[1.8vw] text-[#a172c3] leading-none tracking-tight">약 2분</p>
            </div>

            {/* 위치 */}
            <div className="flex items-center gap-[3vw]">
              <div className="w-[9.74vw] flex justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/location.png" alt="위치" draggable={false} className="h-[6.85vh] w-auto" />
              </div>
              <p className="font-cookierun font-Regular text-[1.8vw] text-[#a172c3] leading-none tracking-tight">매직 아일랜드</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
