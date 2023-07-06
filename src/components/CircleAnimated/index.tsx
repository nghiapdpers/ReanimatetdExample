import React from 'react';
import Animated, {createAnimatedPropAdapter} from 'react-native-reanimated';
import style from './style';
import {Circle} from 'react-native-svg';

const CircleAnimated = Animated.createAnimatedComponent(Circle);

export const CircleAnimatedAdapter = createAnimatedPropAdapter(props => {
  'worklet';

  const keys = Object.keys(props);
}, []);

export default CircleAnimated;
