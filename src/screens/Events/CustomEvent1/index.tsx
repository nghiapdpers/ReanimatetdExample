import React from 'react';
import {View, Text} from 'react-native';
import style from './style';
import {MultiplePressable} from '../../../components/MultiplePressable';
import {useAnimatedMultiplePressableHandler} from './useMultiplePressableHandler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const color = [
  'aquamarine',
  'crimson',
  'darkcyan',
  'darkgoldenrod',
  'darkorange',
  'deeppink',
  'lavenderblush',
  'darkviolet',
  'dodgerblue',
  'lime',
  'magenta',
];

const AnimatedMultiplePressable =
  Animated.createAnimatedComponent(MultiplePressable);

const CustomEvent = () => {
  const colorValue = useSharedValue(0);
  const [clickTime, setClickTime] = React.useState(0);

  const PressableHandler = useAnimatedMultiplePressableHandler({
    onMultiplePress: e => {
      'worklet';
      runOnJS(setClickTime)(e.click);
      colorValue.value = e.click;
    },
  });

  const multiplePressablleAnimation = useAnimatedStyle(() => {
    const randomR = Math.ceil(Math.random() * 255);
    const randomG = Math.ceil(Math.random() * 255);
    const randomB = Math.ceil(Math.random() * 255);
    const backgroundColor =
      colorValue.value < color.length
        ? color[colorValue.value]
        : `rgb(${randomR},${randomG},${randomB})`;
    return {
      backgroundColor,
    };
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.text}>Multiple Click: {clickTime}</Text>
      <AnimatedMultiplePressable
        style={[style.mPressable, multiplePressablleAnimation]}
        onMultiplePress={PressableHandler}
        delay={300}
      />
    </View>
  );
};

export default CustomEvent;
