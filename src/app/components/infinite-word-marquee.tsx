import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface InfiniteWordMarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
}

// ───────────────────────────────────────────────────────
// Styled Components
// ───────────────────────────────────────────────────────
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

const generateAnimation = (direction: 'left' | 'right'): ReturnType<typeof keyframes> => keyframes`
  from { transform: translateX(${direction === 'left' ? '0' : '-100%'}); }
  to   { transform: translateX(${direction === 'left' ? '-100%' : '0'}); }
`;

const AnimatedSpan = styled.span<{
  duration: number;
  animation: ReturnType<typeof generateAnimation>;
}>`
  display: inline-block;
  will-change: transform;
  font-size: 120px;
  height: 130px;
  color: transparent;
  -webkit-text-stroke: 1px #6558ef;
  font-weight: bold;
  animation: ${({ animation, duration }) => css`
    ${animation} ${duration}s linear infinite
  `};
`;

// ───────────────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────────────
const InfiniteWordMarquee: React.FC<InfiniteWordMarqueeProps> = ({
  text,
  direction = 'left',
  speed = 25,
}) => {
  const [repeatString, setRepeatString] = useState('');
  const [duration, setDuration] = useState(0);
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
    const temp = document.createElement('span');
    temp.style.visibility = 'hidden';
    temp.style.whiteSpace = 'nowrap';
    temp.textContent = safeText;
    document.body.appendChild(temp);
    const textWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    const viewportWidth = window.innerWidth;
    let count = Math.ceil((viewportWidth * 2) / textWidth);
    count = Math.min(count, 100);
    const repeated = Array(count).fill(safeText).join('');
    setRepeatString(repeated);

    const totalWidth = textWidth * count;
    setDuration(totalWidth / speed);

    const handleResize = (): void => {
      const newCount = Math.ceil((window.innerWidth * 2) / textWidth);
      const safeCount = Math.min(newCount, 100);
      const newRepeated = Array(safeCount).fill(safeText).join('');
      setRepeatString('');
      setTimeout(() => setRepeatString(newRepeated), 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text, speed]);

  const animationKeyframe = generateAnimation(direction);

  if (!repeatString) {
    return null;
  }

  return (
    <MarqueeContainer ref={containerRef}>
      <MarqueeFlex>
        <AnimatedSpan animation={animationKeyframe} duration={duration}>
          {repeatString}
        </AnimatedSpan>
        <AnimatedSpan animation={animationKeyframe} duration={duration}>
          {repeatString}
        </AnimatedSpan>
      </MarqueeFlex>
    </MarqueeContainer>
  );
};

export default InfiniteWordMarquee;
