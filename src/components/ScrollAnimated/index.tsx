import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated, {createAnimatedPropAdapter} from 'react-native-reanimated';

type CustomScrollProps = {
  scrollToOffset?: {
    x: number;
    y: number;
  };
};

const ScrollAnimatedPure = React.forwardRef<
  ScrollView,
  ScrollViewProps & CustomScrollProps
>((props, ref) => {
  return <ScrollView {...props} ref={ref} />;
});

export const ScrollAnimatedAdapter = createAnimatedPropAdapter(
  props => {
    'worklet';
    const keys = Object.keys(props);

    if (keys.includes('scrollToOffset')) {
      props.contentOffset = props.scrollToOffset;
      delete props.scrollToOffset;
    }
  },
  ['contentOffset'],
);

const ScrollAnimated = Animated.createAnimatedComponent(ScrollAnimatedPure);

export default ScrollAnimated;
