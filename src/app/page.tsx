'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import MarqueeCenterStop from './components/marquee';
import InfiniteWordMarquee from './components/infinite-word-marquee';
import BlinkingArrows from './components/blinking-arrow';
import { Spinner } from './components/spinner';

// ───────────────────────────────────────────────────────
// Styled Components
// ───────────────────────────────────────────────────────
const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Inner = styled.div<{ startAnimations: boolean; pageIndex: number }>`
  display: flex;
  flex-direction: column;
  height: 300vh;
  opacity: ${({ startAnimations }) => (startAnimations ? 1 : 0)};
  transition:
    opacity 500ms ease,
    transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
  transform: translateY(${({ pageIndex }) => -pageIndex * 100}vh);
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Overlay = styled.div<{ fadeOut: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ fadeOut }) => (fadeOut ? 0 : 1)};
  transition: opacity 500ms ease;
  z-index: 9999;
`;

// ───────────────────────────────────────────────────────
// Component (Client)
// ───────────────────────────────────────────────────────
export default function Page(): React.ReactElement {
  // 0. Loading/Spinner State
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [spinnerFadeOut, setSpinnerFadeOut] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    document.fonts.ready.then(() => {
      const elapsed = Date.now() - mountTimeRef.current;
      const delay = elapsed < 1000 ? 1000 - elapsed : 0;
      setTimeout(() => setSpinnerFadeOut(true), delay);
    });
  }, []);

  useEffect(() => {
    if (spinnerFadeOut) {
      const timer = setTimeout(() => {
        setSpinnerVisible(false);
        setStartAnimations(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [spinnerFadeOut]);

  // 1. Marquee Texts
  const firstSentence = 'BACK_END AI SCIENTIST BACK_END FRONT_END DATA ANALYST AI SCIENTIST';
  const secondSentence = 'DEVREL PROJECT MANAGER  DEVELOPER PROJECT MANAGER DEVREL DESIGNER DEVOPS';
  const thirdSentence = 'GNONUE GNONEU NGONEU NOGUNE NOGUEN NOGNEU NOGEUN GNOEUN';
  const firstTarget = 'FRONT_END';
  const secondTarget = 'DEVELOPER';
  const thirdTarget = 'NOGUEN';

  // 2. Page Scroll State
  const [pageIndex, setPageIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isThrottled = useRef(false);
  const sectionsCount = 3;

  useEffect(() => {
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      if (isThrottled.current) {
        return;
      }
      isThrottled.current = true;

      setPageIndex((prev) => {
        if (event.deltaY > 0 && prev < sectionsCount - 1) {
          return prev + 1;
        }
        if (event.deltaY < 0 && prev > 0) {
          return prev - 1;
        }
        return prev;
      });

      setTimeout(() => {
        isThrottled.current = false;
      }, 1200);
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      wrapper?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <Container>
      <Wrapper ref={wrapperRef}>
        <Inner startAnimations={startAnimations} pageIndex={pageIndex}>
          {[...Array(sectionsCount)].map((_, idx) => (
            <Section key={idx}>
              <InfiniteWordMarquee
                text="FRONT_END DEVELOPER NOGUEN"
                direction={idx % 2 === 0 ? 'right' : 'left'}
              />
              {startAnimations && (
                <>
                  <MarqueeCenterStop
                    fullText={firstSentence}
                    targetText={firstTarget}
                    duration={1.5 + idx * 0.5}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                  />
                  <MarqueeCenterStop
                    fullText={secondSentence}
                    targetText={secondTarget}
                    duration={1.5 + idx * 0.5}
                    direction={idx % 2 === 0 ? 'right' : 'left'}
                  />
                  <MarqueeCenterStop
                    fullText={thirdSentence}
                    targetText={thirdTarget}
                    duration={1.5 + idx * 0.5}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                  />
                </>
              )}
              <InfiniteWordMarquee
                text="FRONT_END DEVELOPER NOGUEN"
                direction={idx % 2 === 0 ? 'left' : 'right'}
              />
              {idx === 0 && <BlinkingArrows />}
            </Section>
          ))}
        </Inner>
      </Wrapper>
      {spinnerVisible && (
        <Overlay fadeOut={spinnerFadeOut}>
          <Spinner />
        </Overlay>
      )}
    </Container>
  );
}
