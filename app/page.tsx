import fs from 'fs';
import path from 'path';
import { MapView } from '@/components/MapView';

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
       #Castle_x5F_hover { pointer-events: none; display: block !important; opacity: 0; transition: opacity 0.2s ease; }
       #Castle:hover ~ #Castle_x5F_hover { opacity: 1; }
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
       #Jyrospin { cursor: default; }
       #Jyro_x5F_ride { pointer-events: none; }
       @keyframes jyro-ride-anim {
         0%   { transform: translate(0px, 0px); }
         33%  { transform: translate(-40px, -40px); }
         66%  { transform: translateX(28px); }
         100% { transform: translate(0px, 0px); }
       }
       #Jyrospin:hover ~ #Jyro_x5F_ride { animation: jyro-ride-anim 1.3s linear infinite; }
       #RollerCoater { cursor: default; }
       #RollerCoaster_x5F_ride { pointer-events: none; }
       @keyframes roller-ride-anim {
         0%, 100% { transform: translateX(-35px); }
         50%       { transform: translateX(35px); }
       }
       #RollerCoater:hover ~ #RollerCoaster_x5F_ride { animation: roller-ride-anim 0.8s ease-in-out infinite; }
       #Stone { pointer-events: none; }
       @keyframes stone-bounce {
         0%   { transform: translate(0px, 0px);       animation-timing-function: ease-in; }
         12%  { transform: translate(40px, -90px);    animation-timing-function: ease-out; }
         24%  { transform: translate(80px, -55px);    animation-timing-function: ease-in; }
         36%  { transform: translate(120px, -145px);  animation-timing-function: ease-out; }
         48%  { transform: translate(155px, -110px); }
         52%  { transform: translate(155px, -110px);  animation-timing-function: ease-in; }
         64%  { transform: translate(115px, -185px);  animation-timing-function: ease-out; }
         76%  { transform: translate(75px, -55px);    animation-timing-function: ease-in; }
         88%  { transform: translate(35px, -90px);    animation-timing-function: ease-out; }
         100% { transform: translate(0px, 0px); }
       }
       #RollerCoater:hover ~ #Stone { animation: stone-bounce 2.2s linear infinite; }
       #Store { cursor: default; }
       #Pin1, #Pin21, #Pin31, #Pin4 { pointer-events: none; display: block !important; }
       @keyframes pin-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-28px); } }
       #Castle:hover ~ #Pin1        { animation: pin-float 0.8s ease-in-out infinite; }
       #Jyrospin:hover ~ #Pin21     { animation: pin-float 0.8s ease-in-out infinite; }
       #RollerCoater:hover ~ #Pin31 { animation: pin-float 0.8s ease-in-out infinite; }
       #Store:hover ~ #Pin4         { animation: pin-float 0.8s ease-in-out infinite; }
       </style>`
    )
;

  return <MapView svgContent={svgContent} />;
}
