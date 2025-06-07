'use client';

import React, { useEffect, useRef, useState } from 'react';
import MarqueeCenterStop from './components/marquee';
import InfiniteWordMarquee from './components/infinite-word-marquee';
import BlinkingArrows from './components/blinking-arrow';
import { Spinner } from './components/spinner';

export default function Home(): React.ReactElement {
  // ───────────────────────────────────────────────────────
  // 0. 로딩/스피너 관련 상태
  // ───────────────────────────────────────────────────────
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [spinnerFadeOut, setSpinnerFadeOut] = useState(false);

  // 이 플래그가 true가 되어야 MarqueeCenterStop 애니메이션과 콘텐츠 페이드인이 시작됨
  const [startAnimations, setStartAnimations] = useState(false);

  // 컴포넌트 마운트 시각 기록 (폰트 로드 시간을 측정하기 위함)
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    document.fonts.ready.then(() => {
      const elapsed = Date.now() - mountTimeRef.current;
      const delay = elapsed < 1000 ? 1000 - elapsed : 0;

      setTimeout(() => {
        setSpinnerFadeOut(true);
      }, delay);
    });
  }, []);

  useEffect(() => {
    if (spinnerFadeOut) {
      const time = setTimeout(() => {
        setSpinnerVisible(false);
        setStartAnimations(true);
      }, 500); // 페이드아웃 duration(500ms)과 동일
      return () => clearTimeout(time);
    }
  }, [spinnerFadeOut]);

  const firstSentence =
    'BACK_END AI SCIENTIST BACK_END FRONT_END DATA ANALYST AI SCIENTIST';
  const secondSentence =
    'DEVREL PROJECT MANAGER  DEVELOPER PROJECT MANAGER DEVREL DESIGNER DEVOPS';
  const thirdSentence =
    'GNONUE GNONEU NGONEU NOGUNE NOGUEN NOGNEU NOGEUN GNOEUN';
  const firstTarget = 'FRONT_END';
  const secondTarget = 'DEVELOPER';
  const thirdTarget = 'NOGUEN';

  const [pageIndex, setPageIndex] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionsCount = 3;
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      if (isThrottled.current) {return;}
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
    if (wrapper)
      {wrapper.addEventListener('wheel', handleWheel, { passive: false });}
    return () => {
      if (wrapper) {wrapper.removeEventListener('wheel', handleWheel);}
    };
  }, []);

  useEffect(() => {
    if (!innerRef.current) {return;}
    const offsetY = -pageIndex * window.innerHeight;
    innerRef.current.style.transition =
      'transform 0.8s cubic-bezier(0.77,0,0.175,1)';
    innerRef.current.style.transform = `translateY(${offsetY}px)`;
  }, [pageIndex]);

  // ───────────────────────────────────────────────────────
  // 4. 스타일 정의 (메인 콘텐츠 컨테이너에 페이드인 적용)
  // ───────────────────────────────────────────────────────
  const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  };
  const innerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: `${sectionsCount * 100}vh`,
    // startAnimations이 false면 투명, true면 페이드인
    opacity: startAnimations ? 1 : 0,
    transition: 'opacity 500ms ease',
  };
  const sectionStyle: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  // ───────────────────────────────────────────────────────
  // 5. 렌더링: 스피너 → 메인 (메인 콘텐츠는 startAnimations 시 페이드인)
  // ───────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative' }}>
      {/* 메인 콘텐츠: opacity로 제어 (startAnimations이 true일 때 부드럽게 보임) */}
      <div id="wrapper" ref={wrapperRef} style={wrapperStyle}>
        <div ref={innerRef} style={innerStyle}>
          {/* 섹션 1 */}
          <section style={sectionStyle}>
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="right"
            />
            {/* startAnimations이 true일 때만 MarqueeCenterStop 렌더링 */}
            {startAnimations && (
              <>
                <MarqueeCenterStop
                  fullText={firstSentence}
                  targetText={firstTarget}
                  duration={1.5}
                  direction="left"
                />
                <MarqueeCenterStop
                  fullText={secondSentence}
                  targetText={secondTarget}
                  duration={1.5}
                  direction="right"
                />
                <MarqueeCenterStop
                  fullText={thirdSentence}
                  targetText={thirdTarget}
                  duration={1.5}
                  direction="left"
                />
              </>
            )}
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="left"
            />
            <BlinkingArrows />
          </section>

          {/* 섹션 2 */}
          <section style={sectionStyle}>
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="right"
            />
            {startAnimations && (
              <>
                <MarqueeCenterStop
                  fullText={firstSentence}
                  targetText={firstTarget}
                  duration={2}
                  direction="left"
                />
                <MarqueeCenterStop
                  fullText={secondSentence}
                  targetText={secondTarget}
                  duration={2}
                  direction="right"
                />
                <MarqueeCenterStop
                  fullText={thirdSentence}
                  targetText={thirdTarget}
                  duration={2}
                  direction="left"
                />
              </>
            )}
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="left"
            />
          </section>

          {/* 섹션 3 */}
          <section style={sectionStyle}>
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="right"
            />
            {startAnimations && (
              <>
                <MarqueeCenterStop
                  fullText={firstSentence}
                  targetText={firstTarget}
                  duration={2}
                  direction="left"
                />
                <MarqueeCenterStop
                  fullText={secondSentence}
                  targetText={secondTarget}
                  duration={2}
                  direction="right"
                />
                <MarqueeCenterStop
                  fullText={thirdSentence}
                  targetText={thirdTarget}
                  duration={2}
                  direction="left"
                />
              </>
            )}
            <InfiniteWordMarquee
              text="FRONT_END DEVELOPER NOGUEN"
              direction="left"
            />
          </section>
        </div>
      </div>

      {/* 스피너 오버레이 */}
      {spinnerVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: spinnerFadeOut ? 0 : 1,
            transition: 'opacity 500ms ease',
            zIndex: 9999,
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
