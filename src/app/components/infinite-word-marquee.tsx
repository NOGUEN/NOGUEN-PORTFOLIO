/** @jsxImportSource @emotion/react */
// components/InfiniteWordMarquee.tsx
import React, { useEffect, useRef, useState } from 'react';
import { css, keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

interface InfiniteWordMarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
}

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`;

const MarqueeFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

/** 
 * 모든 반복 텍스트에 공통으로 적용할 Emotion 스타일 
 * - display: inline-block
 * - will-change: transform
 * - font-size: 120px
 */
const contentWrapperBaseStyle: SerializedStyles = css({
  color: 'transparent',
  display: 'inline-block',
  willChange: 'transform',
  fontSize: '120px',
  height: '130px',
  WebkitTextStroke: '1px #6558EF',
  fontWeight: 'bold',
});

/** 좌/우 무한 스크롤 애니메이션 생성 함수 */
const generateAnimation = (direction: 'left' | 'right'): ReturnType<typeof keyframes> => keyframes`
  from { transform: translateX(${direction === 'left' ? '0' : '-100%'}); }
  to   { transform: translateX(${direction === 'left' ? '-100%' : '0'}); }
`;

const InfiniteWordMarquee: React.FC<InfiniteWordMarqueeProps> = ({
  text,
  direction = 'left',
  speed = 25,
}) => {
  const [repeatString, setRepeatString] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text.trim()) {
      setRepeatString('');
      setDuration(0);
      return;
    }

    // 공백을 노브레이킹 스페이스로 변환
    const safeText = text.replace(/ /g, '\u00A0');

    // 임시 span을 만들어 실제 텍스트 너비 측정
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.textContent = safeText;
    document.body.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // 화면 너비
    const viewportWidth = window.innerWidth;

    // 반복 횟수 계산 (화면 너비 × 2 이상)
    let repeatCount = Math.ceil((viewportWidth * 2) / textWidth);
    if (repeatCount > 100) {repeatCount = 100;}

    // 반복 문자열 생성
    let repeated = '';
    for (let i = 0; i < repeatCount; i++) {
      repeated += safeText;
    }
    setRepeatString(repeated);

    // 전체 이동 거리 = 텍스트 너비 × 반복 횟수
    const totalWidth = textWidth * repeatCount;
    const durationSec = totalWidth / speed;
    setDuration(durationSec);

    // 창 크기 변경 시 재계산 (즉시 실행)
    const handleResize = () : void => {
      if (!text.trim()) {return;}
      setRepeatString('');
      setTimeout(() => {
        setRepeatString(repeated);
      }, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [text, speed]);

  const animationKeyframe = generateAnimation(direction);

  return (
    <MarqueeContainer ref={containerRef}>
      {repeatString && (
        <MarqueeFlex>
          <span
            css={[
              contentWrapperBaseStyle,
              css`
                animation: ${animationKeyframe} ${duration}s linear infinite;
              `,
            ]}
          >
            {repeatString}
          </span>
          <span
            css={[
              contentWrapperBaseStyle,
              css`
                animation: ${animationKeyframe} ${duration}s linear infinite;
              `,
            ]}
          >
            {repeatString}
          </span>
        </MarqueeFlex>
      )}
    </MarqueeContainer>
  );
};

export default InfiniteWordMarquee;