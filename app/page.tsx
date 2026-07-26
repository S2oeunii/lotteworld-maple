import fs from 'fs';
import path from 'path';
import { MapExplorer } from '@/components/MapExplorer';

export default function Page() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'public', 'map.svg'),
    'utf-8'
  );

  // XML 선언 제거 + Castle 호버 + Pinkbin 점프 애니메이션 CSS 주입
  const svgContent = raw
    .replace(/^<\?xml[^?]*\?>\s*/i, '')
    .replace(
      '</style>',
      `#Castle { cursor: default; }
       #Castle_x5F_hover { pointer-events: none; }
       #Castle:hover ~ #Castle_x5F_hover { display: block !important; }
       @keyframes pinkbin-jump {
         0%, 100% { transform: translateY(0); animation-timing-function: ease-in; }
         45%       { transform: translateY(-40px); animation-timing-function: ease-out; }
         55%       { transform: translateY(-40px); }
       }
       #Pinkbin { animation: pinkbin-jump 1s infinite; }
       @keyframes snail-walk {
         0%, 100% { transform: translate(-10px, -7px); }
         50%       { transform: translate(20px, 30px); }
       }
       #Snail { animation: snail-walk 3s ease-in-out infinite; }
       @keyframes balloon-float {
         0%, 100% { transform: translate(0, 0); }
         30%       { transform: translate(14px, -28px); }
         60%       { transform: translate(-10px, -18px); }
       }
       #Balloon { animation: balloon-float 4s ease-in-out infinite; }
       @keyframes slime-fly {
         0%, 100% { transform: translate(0, 0); }
         25%       { transform: translate(30px, -25px); }
         50%       { transform: translate(-20px, -40px); }
         75%       { transform: translate(15px, -15px); }
       }
       #Slime { animation: slime-fly 1.2s ease-in-out infinite; }
       </style>`
    );

  return <MapExplorer svgContent={svgContent} />;
}
