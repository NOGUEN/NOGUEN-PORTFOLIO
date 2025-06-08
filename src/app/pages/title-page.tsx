import BlinkingArrows from '../components/blinking-arrow';
import InfiniteWordMarquee from '../components/infinite-word-marquee';
import MarqueeCenterStop from '../components/marquee';

export function TitlePage(): React.ReactElement {
  const infiniteMarqueeText = 'FRONT_END DEVELOPER NOGUEN';
  const firstSentence = 'BACK_END AI SCIENTIST BACK_END FRONT_END DATA ANALYST AI SCIENTIST';
  const secondSentence = 'DEVREL PROJECT MANAGER  DEVELOPER PROJECT MANAGER DEVREL DESIGNER DEVOPS';
  const thirdSentence = 'GNONUE GNONEU NGONEU NOGUNE NOGUEN NOGNEU NOGEUN GNOEUN';
  const firstTarget = 'FRONT_END';
  const secondTarget = 'DEVELOPER';
  const thirdTarget = 'NOGUEN';

  return (
    <>
      <InfiniteWordMarquee text={infiniteMarqueeText} direction={'right'} />
      <MarqueeCenterStop
        fullText={firstSentence}
        targetText={firstTarget}
        duration={1.5}
        direction={'left'}
      />
      <MarqueeCenterStop
        fullText={secondSentence}
        targetText={secondTarget}
        duration={1.5}
        direction={'right'}
      />
      <MarqueeCenterStop
        fullText={thirdSentence}
        targetText={thirdTarget}
        duration={1.5}
        direction={'left'}
      />
      <InfiniteWordMarquee text={infiniteMarqueeText} direction={'right'} />
      <BlinkingArrows />
    </>
  );
}
