'use client';

import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/**
 * 세 개의 화살표가 아래로 향하며 순차적으로 깜빡이는 컴포넌트
 * gap 대신 margin-top으로 겹침 조정
 */

// 1) 화살표 깜빡임 애니메이션: opacity 0 → 1 → 0
const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

// 2) 공통 화살표 스타일 (SVG을 감싸는 컨테이너)
const ArrowWrapper = styled.div<{ delay: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${blink} 1.2s infinite;
  animation-delay: ${({ delay }) => delay};
  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-top: -20px;
  }
`;

// 3) SVG 자체 스타일 (크기나 색상 등을 한 번에 조정 가능)
const ChevronIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = '#7c83fd',
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

// 4) 세 개의 ArrowWrapper를 묶는 컨테이너
const Container = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

/**
 * BlinkingArrows 컴포넌트
 * - 한 번에 세 개의 화살표가 세로로 쌓여 있고, 순서대로 깜빡임
 */
const BlinkingArrows: React.FC = () => (
  <Container>
    <ArrowWrapper delay="0s">
      <ChevronIcon />
    </ArrowWrapper>
    <ArrowWrapper delay="0.3s">
      <ChevronIcon />
    </ArrowWrapper>
    <ArrowWrapper delay="0.6s">
      <ChevronIcon />
    </ArrowWrapper>
  </Container>
);

export default BlinkingArrows;
