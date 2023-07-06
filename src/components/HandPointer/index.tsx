import {Icon, IconProps} from '@rneui/themed';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Text, View} from 'react-native';
import React from 'react';
import {HandPointerProps} from './type';
import style from './style';

const AnimatedHandPointer = Animated.createAnimatedComponent(View);

export default function HandPointerElement(props: {
  pointer: Animated.SharedValue<HandPointerProps>;
  active: Animated.SharedValue<boolean>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = props.pointer.value.x;
    const translateY = props.pointer.value.y;
    const opacity = withTiming(props.pointer.value.visible ? 1 : 0);
    const scale = withTiming(props.active.value ? 1.2 : 1);
    const backgroundColor = props.active.value ? 'green' : 'red';

    return {
      transform: [{translateX}, {translateY}, {scale}],
      opacity,
      backgroundColor,
    };
  }, []);

  return <AnimatedHandPointer style={[style.pointer, animatedStyle]} />;
}
