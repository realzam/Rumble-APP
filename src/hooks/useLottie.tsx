import { useEffect, useRef } from 'react';
import lottie, {
  AnimationConfig,
  AnimationItem,
  LottiePlayer,
} from 'lottie-web';

type LottieAnimationConfig = Omit<AnimationConfig, 'container'>;

type AnimationConfigWithPath = LottieAnimationConfig & {
  path?: string;
};

type AnimationConfigWithData = LottieAnimationConfig & {
  animationData?: any;
};
/*
 {
    container: animationContainer.current as Element,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation/hangman.json',
    name: 'hangman',
  }

  const [LottieComponent,animate,lottie,animateRef]
*/
const useLottie = (
  config: AnimationConfigWithPath | AnimationConfigWithData,
): [
  () => JSX.Element,
  React.MutableRefObject<AnimationItem | undefined>,
  LottiePlayer,
  React.RefObject<HTMLDivElement>,
] => {
  const animationRef = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationItem>();

  useEffect(() => {
    animation.current = lottie.loadAnimation({
      ...config,
      container: animationRef.current as Element,
    });
  }, [config]);

  const component = () => <div ref={animationRef} />;

  return [component, animation, lottie, animationRef];
};

export default useLottie;
