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
       #Store { cursor: default; }
       #Store_particles { pointer-events: none; display: none; }
       #Store:hover ~ #Store_particles { display: block; }
       @keyframes sp1  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(-110px,-170px);opacity:0} }
       @keyframes sp2  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(110px,-170px);opacity:0} }
       @keyframes sp3  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(0,-190px);opacity:0} }
       @keyframes sp4  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(-160px,-100px);opacity:0} }
       @keyframes sp5  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(160px,-100px);opacity:0} }
       @keyframes sp6  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(-75px,-195px);opacity:0} }
       @keyframes sp7  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(75px,-195px);opacity:0} }
       @keyframes sp8  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(180px,-60px);opacity:0} }
       @keyframes sp9  { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(-180px,-60px);opacity:0} }
       @keyframes sp10 { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(50px,-200px);opacity:0} }
       @keyframes sp11 { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(-50px,-200px);opacity:0} }
       @keyframes sp12 { 0%{transform:translate(0,0);opacity:1} 70%{opacity:0.8} 100%{transform:translate(130px,-150px);opacity:0} }
       #Store_particles circle:nth-child(1) {animation:sp1  0.9s ease-out infinite;animation-delay:0s}
       #Store_particles circle:nth-child(2) {animation:sp2  0.9s ease-out infinite;animation-delay:0.07s}
       #Store_particles circle:nth-child(3) {animation:sp3  0.9s ease-out infinite;animation-delay:0.14s}
       #Store_particles circle:nth-child(4) {animation:sp4  0.9s ease-out infinite;animation-delay:0.21s}
       #Store_particles circle:nth-child(5) {animation:sp5  0.9s ease-out infinite;animation-delay:0.28s}
       #Store_particles circle:nth-child(6) {animation:sp6  0.9s ease-out infinite;animation-delay:0.05s}
       #Store_particles circle:nth-child(7) {animation:sp7  0.9s ease-out infinite;animation-delay:0.12s}
       #Store_particles circle:nth-child(8) {animation:sp8  0.9s ease-out infinite;animation-delay:0.19s}
       #Store_particles circle:nth-child(9) {animation:sp9  0.9s ease-out infinite;animation-delay:0.26s}
       #Store_particles circle:nth-child(10){animation:sp10 0.9s ease-out infinite;animation-delay:0.33s}
       #Store_particles circle:nth-child(11){animation:sp11 0.9s ease-out infinite;animation-delay:0.08s}
       #Store_particles circle:nth-child(12){animation:sp12 0.9s ease-out infinite;animation-delay:0.16s}
       </style>`
    )
    .replace(
      '</svg>',
      `<g id="Store_particles">
        <circle cx="3320" cy="1180" r="10" fill="#FFD700"/>
        <circle cx="3320" cy="1180" r="8"  fill="#FF69B4"/>
        <circle cx="3320" cy="1180" r="9"  fill="#00BFFF"/>
        <circle cx="3320" cy="1180" r="12" fill="#FF6347"/>
        <circle cx="3320" cy="1180" r="7"  fill="#98FB98"/>
        <circle cx="3320" cy="1180" r="9"  fill="#FFA500"/>
        <circle cx="3320" cy="1180" r="6"  fill="#DA70D6"/>
        <circle cx="3320" cy="1180" r="11" fill="#FFD700"/>
        <circle cx="3320" cy="1180" r="8"  fill="#FF1493"/>
        <circle cx="3320" cy="1180" r="7"  fill="#00CED1"/>
        <circle cx="3320" cy="1180" r="10" fill="#ADFF2F"/>
        <circle cx="3320" cy="1180" r="9"  fill="#FF6347"/>
      </g></svg>`
    );

  return <MapView svgContent={svgContent} />;
}
