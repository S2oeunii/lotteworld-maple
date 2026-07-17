import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '롯데월드 메이플 — 지도 탐험',
  description: '롯데월드를 지도로 탐험해보세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
