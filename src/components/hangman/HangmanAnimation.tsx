import { useContext, useEffect, useRef, useState } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import HangmanContext from '../../context/games/HangamanContext';

function HangmanAnimation() {
  const {
    gameData: { lifes },
  } = useContext(HangmanContext);
  const [anime, setAnime] = useState<AnimationItem>();
  const isStart = useRef(true);

  const getSegments = (s: number): [number, number] => {
    const b = 24 * s;
    return [144 - b, 167 - b];
  };

  useEffect(() => {
    if (anime) {
      if (isStart.current) {
        if (lifes === 0) {
          anime?.goToAndStop(167, true);
        } else {
          anime?.goToAndStop(168 - 24 * lifes, true);
        }
        isStart.current = false;
      } else {
        anime?.playSegments(getSegments(lifes), true);
      }
    }
  }, [anime, lifes]);

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
