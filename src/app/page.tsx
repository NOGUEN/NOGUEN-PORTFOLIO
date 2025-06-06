"use client";

import React, { useEffect, useRef, useState } from "react";
import MarqueeCenterStop from "./components/marquee";
import InfiniteWordMarquee from "./components/infinite-word-marquee";
import BlinkingArrows from "./components/blinking-arrow";

export default function Home() {
  const firstSentence = "BACK_END AI SCIENTIST BACK_END FRONT_END DATA ANALYST AI SCIENTIST";
  const secondSentence = "DEVREL PROJECT MANAGER  DEVELOPER PROJECT MANAGER DEVREL DESIGNER DEVOPS";
  const thirdSentence = "GNONUE GNONEU NGONEU NOGUNE NOGUEN NOGNEU NOGEUN GNOEUN";
  const firstTarget = "FRONT_END";
  const secondTarget = "DEVELOPER";
  const thirdTarget = "NOGUEN";

  // 현재 페이지 인덱스 (0부터 시작)
  const [pageIndex, setPageIndex] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 섹션 개수 (여기서는 3)
  const sectionsCount = 3;
  // 휠 이벤트 처리 중복 방지를 위한 ref
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 기본 스크롤 막기

      if (isThrottled.current) return;
      isThrottled.current = true;

      // 무조건 한 섹션만 이동하도록 deltaY 크기와 무관하게 ±1만 처리
      setPageIndex((prev) => {
        if (e.deltaY > 0 && prev < sectionsCount - 1) {
          return prev + 1;
        }
        if (e.deltaY < 0 && prev > 0) {
          return prev - 1;
        }
        return prev;
      });

      // 1000ms 후에 다시 스크롤 허용 (transition 시간과 같거나 조금 더 길게)
      setTimeout(() => {
        isThrottled.current = false;
      }, 1200);
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    if (!innerRef.current) return;
    // pageIndex가 바뀔 때마다 정확히 100vh씩 translateY
    const offsetY = -pageIndex * window.innerHeight;
    innerRef.current.style.transition = "transform 0.8s cubic-bezier(0.77,0,0.175,1)";
    innerRef.current.style.transform = `translateY(${offsetY}px)`;
  }, [pageIndex]);

  // 최상위 래퍼: 화면 전체 고정, overflow:hidden
  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  };

  // 내부 컨테이너: flex-col, height = sectionsCount × 100vh
  const innerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: `${sectionsCount * 100}vh`, // 3 × 100vh = 300vh
  };

  // 각 섹션(화면 한 칸) 스타일
  const sectionStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  return (
    <div id="wrapper" ref={wrapperRef} style={wrapperStyle}>
      <div ref={innerRef} style={innerStyle}>
        {/* 섹션 1 */}
        <section style={sectionStyle}>
          <InfiniteWordMarquee
            text="FRONT_END DEVELOPER NOGUEN"
            direction="right"
          />
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
          <InfiniteWordMarquee
            text="FRONT_END DEVELOPER NOGUEN"
            direction="left"
          />
          <BlinkingArrows></BlinkingArrows>
        </section>

        {/* 섹션 2 */}
        <section style={sectionStyle}>
          <InfiniteWordMarquee
            text="FRONT_END DEVELOPER NOGUEN"
            direction="right"
          />
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
          <InfiniteWordMarquee
            text="FRONT_END DEVELOPER NOGUEN"
            direction="left"
          />
        </section>
      </div>
    </div>
  );
}