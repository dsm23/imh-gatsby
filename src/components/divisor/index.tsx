import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import lottie, { AnimationItem, AnimationConfigWithData } from 'lottie-web';
import animationData from '../../animations/waveLine.json';

type OptionsConfig = Omit<AnimationConfigWithData, 'container'>;

const options: OptionsConfig = {
  loop: false,
  autoplay: true,
  animationData,
  renderer: 'svg',
  rendererSettings: {
    // width matches viewBox
    preserveAspectRatio: 'xMinYMid slice',
    progressiveLoad: true,
    // unique to waveLine
    viewBoxSize: '0 300 1155 100',
    viewBoxOnly: true,
  },
};

const startFrame = 0;
const endFrame = 100;

const Divisor: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim: AnimationItem = lottie.loadAnimation({
      container: animationContainer.current as HTMLDivElement,
      ...options,
    });

    anim.playSegments([startFrame, endFrame], true);

    return () => anim.destroy(); // optional clean up for unmounting
  }, []);

  return <div {...props} ref={animationContainer} />;
};

export default Divisor;
