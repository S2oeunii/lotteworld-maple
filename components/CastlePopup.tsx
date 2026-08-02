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
      </div>
    </div>
  );
}
