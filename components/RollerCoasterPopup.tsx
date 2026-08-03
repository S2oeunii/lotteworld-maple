'use client';

type Props = { onClose: () => void };

export function RollerCoasterPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start bg-black/50">
      <div className="relative mt-[10vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/popup_bg2.png" alt="rollercoaster popup" draggable={false} style={{ width: '46.88vw', height: '69.72vh' }} />

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-[13.5vh] right-[1.6vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/closeBtn.png" alt="close" draggable={false} style={{ width: '4.48vw', height: '6.30vh' }} />
        </button>

        {/* 스톤 캐릭터 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/stone_cha.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute pointer-events-none"
          style={{ width: '10.42vw', height: 'auto', left: '-4vw', bottom: '2vh', animation: 'stone-bounce 0.7s ease-in-out infinite' }}
        />

        {/* 팝업 콘텐츠 */}
        <div className="absolute inset-0 px-[3.5vw] pt-[10vh] flex flex-col items-center text-center pointer-events-none">
          {/* 타이틀 */}
          <h2 className="font-cookierun font-bold text-[3vw] leading-none tracking-tight text-[#6c4886] mt-[5.5vh]">
            스톤 익스프레스
          </h2>

          {/* 설명 */}
          <p className="font-pretendard font-medium text-[1.4vw] text-[#000] mt-[1.5vh] leading-normal tracking-tight">
            다 함께 &apos;스톤 익스프레스&apos;를 타고 파크 전역을 돌며<br />
            흩어진 돌의 정령들을 찾아주세요!
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
              <img src="/Stars4.png" alt="별 4개" draggable={false} className="w-[12.6vw] h-auto" />
            </div>

            {/* 탑승 시간 */}
            <div className="flex items-center gap-[3vw]">
              <div className="w-[9.74vw] flex justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ridingTime.png" alt="탑승 시간" draggable={false} className="h-[6.67vh] w-auto" />
              </div>
              <p className="font-cookierun font-Regular text-[1.8vw] text-[#a172c3] leading-none tracking-tight">약 1분 30초</p>
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
