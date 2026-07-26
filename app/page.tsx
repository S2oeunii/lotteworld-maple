import fs from 'fs';
import path from 'path';
import { MapExplorer } from '@/components/MapExplorer';

export default function Page() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'public', 'map.svg'),
    'utf-8'
  );

  // XML 선언 제거 + Castle 호버 CSS 주입
  const svgContent = raw
    .replace(/^<\?xml[^?]*\?>\s*/i, '')
    .replace(
      '</style>',
      `#Castle { cursor: default; }
       #Castle:hover ~ #Castle_x5F_hover { display: block !important; }
       </style>`
    );

  return <MapExplorer svgContent={svgContent} />;
}
