/** @jsxImportSource @emotion/react */
'use client';

import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import { css, SerializedStyles } from '@emotion/react';

interface Props {
  fullText: string;
  targetText: string;
  duration?: number; // 애니메이션 지속 시간(초 단위)
  direction?: 'left' | 'right'; // 'left'면 왼쪽으로, 'right'면 오른쪽으로 움직임
}

const MarqueeCenterStop: React.FC<Props> = ({
  fullText,
  targetText,
  duration = 3,
  direction = 'right',
}) => {
  // 1. refs: container, content, target
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLSpanElement | null>(null);

  // 2. state: translateX, transitionEnabled, fadeIn
  const [translateX, setTranslateX] = useState<number>(0);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  // 3. 애니메이션 및 측정 로직
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !targetRef.current) {
      return;
    }

    // 3-1. container 너비, content 너비, target 위치/크기 측정
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;
    const targetOffsetLeft = targetRef.current.offsetLeft;
    const targetWidth = targetRef.current.offsetWidth;

    // 3-2. 중앙과 target의 중심 좌표 계산
    const containerCenter = containerWidth / 2;
    const targetCenterRelative = targetOffsetLeft + targetWidth / 2;

    // 3-3. target을 중앙으로 옮기기 위한 이동 거리(rawDistance) 계산
    // rawDistance = containerCenter - targetCenterRelative
    const rawDistance = containerCenter - targetCenterRelative;

    // 3-4. direction에 따라 initialTranslateX 설정
    // 'right': 오른쪽 끝부터 보여야 하므로 initialTranslateX = containerWidth - contentWidth
    // 'left': 왼쪽 끝부터 보여야 하므로 initialTranslateX = 0
    const initialTranslateX =
      direction === 'right' ? containerWidth - contentWidth : 0;

    // 3-5. finalTranslateX는 항상 rawDistance (target을 중앙으로 이동시키는 절대 위치)
    const finalTranslateX = rawDistance;

    // 3-6. 초기 상태 설정
    setTranslateX(initialTranslateX);
    setFadeIn(false);
    setTransitionEnabled(false);

    // 3-7. 짧은 지연 후 transition 활성화 & 최종 위치로 이동
    const timeoutId = window.setTimeout(() => {
      setTransitionEnabled(true);
      setTranslateX(finalTranslateX);
    }, 50);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fullText, targetText, direction]);

  // 4. fullText를 targetText 기준으로 prefix/target/suffix 분리 후 렌더
  const renderTextWithTarget = (): React.ReactNode => {
    const idx = fullText.indexOf(targetText);
    if (idx === -1) {
      // targetText가 없으면 전체 문자열을 글자 단위로 outline 처리
      return fullText.split('').map((char, i) => (
        <span key={'noT' + i} css={outlineCharStyle}>
          {char}
        </span>
      ));
    }

    const prefixText = fullText.slice(0, idx);
    const suffixText = fullText.slice(idx + targetText.length);

    return (
      <>
        {prefixText.split('').map((char, i) => (
          <span key={'p' + i} css={outlineCharStyle}>
            {char}
          </span>
        ))}
        <span ref={targetRef} css={targetStyle(fadeIn)}>
          {targetText}
        </span>
        {suffixText.split('').map((char, i) => (
          <span key={'s' + i} css={outlineCharStyle}>
            {char}
          </span>
        ))}
      </>
    );
  };

  // 5. emotion 스타일 정의
  // 5-1. 컨테이너(outer)
  const containerStyle: SerializedStyles = css({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    width: '100%', // 부모 엘리먼트가 충분히 넓어야 전체 텍스트가 보임
  });

  // 5-2. 움직이는 콘텐츠 래퍼: translate/transition + font-size 설정
  const contentWrapperBaseStyle: SerializedStyles = css({
    display: 'inline-block',
    willChange: 'transform',
    fontSize: '120px', // 모든 텍스트 크기 120px
    height: '120px', // 텍스트 높이와 일치시켜야 함
  });

  // 5-3. outline 문자 스타일 (prefix, suffix에 적용)
  const outlineCharStyle: SerializedStyles = css({
    color: 'transparent',
    WebkitTextStroke: '1px #6558EF',
    fontWeight: 'bold',
  });

  // 5-4. target 단어 스타일 (fadeIn 상태에 따라 outline→fill 전환)
  const targetStyle = (fadeIn: boolean): SerializedStyles => css({
    color: fadeIn ? '#6558EF' : 'transparent',
    WebkitTextStroke: '1px #6558EF',
    transition: 'color 0.5s ease-in',
    fontWeight: 'bold',
  });

  // 6. inline style: translateX, transition 설정
  const contentStyle: CSSProperties = {
    transform: `translateX(${translateX}px)`,
    transition: transitionEnabled
      ? `transform ${duration}s ease-out`
      : 'none',
  };

  // 7. JSX 반환
  return (
    <div ref={containerRef} css={containerStyle}>
      <div
        ref={contentRef}
        css={contentWrapperBaseStyle}
        style={contentStyle}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform') {
            setFadeIn(true);
          }
        }}
      >
        {renderTextWithTarget()}
      </div>
    </div>
  );
};

export default MarqueeCenterStop;