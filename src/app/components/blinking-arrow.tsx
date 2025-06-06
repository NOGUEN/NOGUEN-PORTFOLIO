/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

/**
 * 세 개의 화살표가 아래로 향하며 순차적으로 깜빡이는 컴포넌트
 *
 * 이전에 gap을 음수로 주셨는데, gap에 음수를 사용하면 의도치 않은 레이아웃 문제가 생길 수 있습니다.
 * 대신 “gap: 0”으로 설정하고, 각 ArrowWrapper에 margin-top을 음수로 주어 화살표가 더욱 겹치도록 조정하겠습니다.
 */

// 1) 화살표 깜빡임 애니메이션: opacity 0 → 1 → 0
const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// 2) 공통 화살표 스타일 (SVG을 감싸는 컨테이너)
const ArrowWrapper = styled.div<{ delay: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  /* 깜빡임 애니메이션: blink 1.2초 무한 반복, delay만큼 시작 지연 */
  animation: ${blink} 1.2s infinite;
  animation-delay: ${({ delay }) => delay};

  /* 기본적으로 보이지 않다가 애니메이션이 시작될 때 opacity:1로 변화 */
  opacity: 0;

  /* 두 번째, 세 번째 화살표를 위로 조금 겹치도록 margin-top을 음수로 설정 */
  &:nth-of-type(2) {
    margin-top: -20px;
  }
  &:nth-of-type(3) {
    margin-top: -20px;
  }
`;

// 3) SVG 자체 스타일 (크기나 색상 등을 한 번에 조정 가능)
const ChevronIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#7c83fd",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 4) 세 개의 ArrowWrapper를 묶는 컨테이너 (gap을 0으로 하고, 개별 margin-top으로 겹침 조정)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0; /* 기본 간격은 0으로 설정 */
`;

/**
 * BlinkingArrows 컴포넌트
 * - 한 번에 세 개의 화살표가 세로로 쌓여 있고, 순서대로 깜빡임
 */
const BlinkingArrows: React.FC = () => {
  return (
    <Container>
      {/* delay: 0s, 0.3s, 0.6s 순서로 깜빡이도록 설정 */}
      <ArrowWrapper delay="0s">
        <ChevronIcon size={40} />
      </ArrowWrapper>
      <ArrowWrapper delay="0.3s">
        <ChevronIcon size={40} />
      </ArrowWrapper>
      <ArrowWrapper delay="0.6s">
        <ChevronIcon size={40} />
      </ArrowWrapper>
    </Container>
  );
};

export default BlinkingArrows;