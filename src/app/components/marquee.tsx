import React, { useRef, useEffect, useState, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  fullText: string;
  targetText: string;
  duration?: number;
  direction?: 'left' | 'right';
}

// ───────────────────────────────────────────────────────
// Styled Components
// ───────────────────────────────────────────────────────
const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
`;

const ContentWrapper = styled.div<{
  translateX: number;
  transitionEnabled: boolean;
  duration: number;
}>`
  display: inline-block;
  will-change: transform;
  font-size: 120px;
  height: 130px;
  transform: translateX(${(props) => props.translateX}px);
  transition: ${(props) =>
    props.transitionEnabled ? `transform ${props.duration}s ease-out` : 'none'};
`;

const OutlineChar = styled.span`
  color: transparent;
  -webkit-text-stroke: 1px #6558ef;
  font-weight: bold;
`;

const TargetChar = styled.span<{ fadeIn: boolean }>`
  color: ${(props) => (props.fadeIn ? '#6558EF' : 'transparent')};
  -webkit-text-stroke: 1px #6558ef;
  transition: color 0.5s ease-in;
  font-weight: bold;
`;

// ───────────────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────────────
const MarqueeCenterStop: React.FC<Props> = ({
  fullText,
  targetText,
  duration = 3,
  direction = 'right',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !targetRef.current) {
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;
    const targetOffsetLeft = targetRef.current.offsetLeft;
    const targetWidth = targetRef.current.offsetWidth;

    const containerCenter = containerWidth / 2;
    const targetCenterRelative = targetOffsetLeft + targetWidth / 2;
    const rawDistance = containerCenter - targetCenterRelative;

    const initialTranslateX = direction === 'right' ? containerWidth - contentWidth : 0;
    const finalTranslateX = rawDistance;

    setTranslateX(initialTranslateX);
    setFadeIn(false);
    setTransitionEnabled(false);

    const timeoutId = window.setTimeout(() => {
      setTransitionEnabled(true);
      setTranslateX(finalTranslateX);
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [fullText, targetText, direction]);

  const renderTextWithTarget = (): ReactNode => {
    const idx = fullText.indexOf(targetText);
    if (idx === -1) {
      return fullText.split('').map((char, i) => <OutlineChar key={i}>{char}</OutlineChar>);
    }

    const prefix = fullText.slice(0, idx);
    const suffix = fullText.slice(idx + targetText.length);

    return (
      <>
        {prefix.split('').map((char, i) => (
          <OutlineChar key={`p${i}`}>{char}</OutlineChar>
        ))}
        <TargetChar ref={targetRef} fadeIn={fadeIn}>
          {targetText}
        </TargetChar>
        {suffix.split('').map((char, i) => (
          <OutlineChar key={`s${i}`}>{char}</OutlineChar>
        ))}
      </>
    );
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>): void => {
    if (event.propertyName === 'transform') {
      setFadeIn(true);
    }
  };

  return (
    <Container ref={containerRef}>
      <ContentWrapper
        ref={contentRef}
        translateX={translateX}
        transitionEnabled={transitionEnabled}
        duration={duration}
        onTransitionEnd={handleTransitionEnd}
      >
        {renderTextWithTarget()}
      </ContentWrapper>
    </Container>
  );
};

export default MarqueeCenterStop;
