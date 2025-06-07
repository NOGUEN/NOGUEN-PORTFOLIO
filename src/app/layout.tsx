// src/app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// public/fonts/PretendardVariable.woff2 경로를 지정 (layout.tsx에서 ../public/... 로 접근)
const pretendard = localFont({
  variable: '--font-pretendard',
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff', // weight 400 (Regular)
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff', // weight 700 (Bold)
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOGUEN',
  description: 'NOGUEN PORTFOLIO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) : React.JSX.Element {
  return (
    <html lang="ko">
      {/* Pretendard 변수를 body에 붙이면, CSS에서 var(--font-pretendard)를 사용할 수 있습니다. */}
      <body className={pretendard.variable}>{children}</body>
    </html>
  );
}
