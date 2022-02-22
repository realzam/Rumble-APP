import { useContext, useEffect, useRef, useState } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import HangmanContext from '../../context/games/HangamanContext';

function HangmanAnimation() {
  const { segment } = useContext(HangmanContext);
  const [anime, setAnime] = useState<AnimationItem>();
  const isStart = useRef(true);

  const getSegments = (s: number): [number, number] => {
    return [24 * (s - 1), 24 * s - 1];
  };

  useEffect(() => {
    if (anime) {
      if (isStart.current) {
        console.log('hola animation', segment);
        if (segment === 7) {
          anime.goToAndStop(24 * segment - 1, true);
        } else {
          anime.goToAndStop(24 * segment, true);
        }
        isStart.current = false;
      } else {
        console.log('play segment', segment);
        anime.playSegments(getSegments(segment), true);
      }
    }
  }, [anime, segment]);

  useEffect(() => {
    const temp = Lottie.loadAnimation({
      container: document.getElementById('ani') as Element,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/hangman.json',
      name: 'hangman',
    });
    setAnime(temp);
  }, [setAnime]);

  return <div id="ani" />;
}

export default HangmanAnimation;
