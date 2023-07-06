import {Easing, withTiming, AnimatedStyleProp} from 'react-native-reanimated';
import {SCREEN_HEIGHT, WINDOW_WIDTH} from '../../../global';
import {ImageStyle} from 'react-native';

type CTAnimatedType = (isGoOut: boolean) => AnimatedStyleProp<ImageStyle>;

export const animateTTB: CTAnimatedType = isGoOut => {
  'worklet';
  const targetPosition = isGoOut ? -SCREEN_HEIGHT : 0;
  const targetOpacity = isGoOut ? 0 : 1;
  const myEasing = Easing.inOut(Easing.cubic);

  return {
    opacity: withTiming(targetOpacity, {
      duration: isGoOut ? 3000 : 2000,
      easing: myEasing,
    }),
    transform: [
      {
        translateY: withTiming(targetPosition, {
          duration: 2000,
          easing: myEasing,
        }),
      },
    ],
    zIndex: isGoOut ? 0 : 5,
  };
};

export const animateBTT: CTAnimatedType = isGoOut => {
  'worklet';
  const targetPosition = isGoOut ? SCREEN_HEIGHT : 0;
  const targetOpacity = isGoOut ? 0 : 1;
  const myEasing = Easing.inOut(Easing.cubic);

  return {
    opacity: withTiming(targetOpacity, {
      duration: isGoOut ? 3000 : 2000,
      easing: myEasing,
    }),
    transform: [
      {
        translateY: withTiming(targetPosition, {
          duration: 2000,
          easing: myEasing,
        }),
      },
    ],
    zIndex: isGoOut ? 0 : 5,
  };
};

export const animateLTR: CTAnimatedType = isGoOut => {
  'worklet';
  const targetPosition = isGoOut ? -WINDOW_WIDTH : 0;
  const targetOpacity = isGoOut ? 0 : 1;
  const myEasing = Easing.inOut(Easing.cubic);

  return {
    opacity: withTiming(targetOpacity, {
      duration: isGoOut ? 3000 : 2000,
      easing: myEasing,
    }),
    transform: [
      {
        translateX: withTiming(targetPosition, {
          duration: 2000,
          easing: myEasing,
        }),
      },
    ],
    zIndex: isGoOut ? 0 : 5,
  };
};

export const animateRTL: CTAnimatedType = isGoOut => {
  'worklet';
  const targetPosition = isGoOut ? WINDOW_WIDTH : 0;
  const targetOpacity = isGoOut ? 0 : 1;
  const myEasing = Easing.inOut(Easing.cubic);

  return {
    opacity: withTiming(targetOpacity, {
      duration: isGoOut ? 3000 : 2000,
      easing: myEasing,
    }),
    transform: [
      {
        translateX: withTiming(targetPosition, {
          duration: 2000,
          easing: myEasing,
        }),
      },
    ],
    zIndex: isGoOut ? 0 : 5,
  };
};
