import React from 'react';
import {View, Text} from 'react-native';
import style from './style';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  useDerivedValue,
} from 'react-native-reanimated';
import MyButton from '../../../components/MyButton';
import {WINDOW_WIDTH} from '../../../global';
import {PanGestureHandler} from 'react-native-gesture-handler';

const Animation3 = () => {
  const boxX = useSharedValue(0);
  const boxY = useSharedValue(0);

  const boxAnimate1 = useAnimatedStyle(() => {
    const translateX = boxX.value;
    const translateY = boxY.value;
    return {
      transform: [{translateX}, {translateY}],
    };
  });

  // useDerivedValue(() => {
  //   console.log(boxX.value);
  //   if (boxX.value == 200) {
  //     boxY.value = withTiming(500, {duration: 1000});
  //   }
  // });

  return (
    <View style={style.container}>
      <Animated.View style={[style.box, boxAnimate1]}></Animated.View>
      <MyButton
        btStyle={style.button}
        text="Change Value (withSequence)"
        onPress={() => {
          // boxX.value = withTiming(200, {duration: 500});
          boxX.value = withSequence(
            withTiming(200, {duration: 500}),
            withDelay(1000, withTiming(-200, {duration: 1000})),
            withTiming(0, {duration: 500}),
          );
          boxY.value = withDelay(500, withTiming(500, {duration: 1000}));
        }}
      />
      <MyButton
        btStyle={style.button}
        text="Change Value (withDelay)"
        onPress={() => {
          boxX.value = withDelay(
            500,
            withTiming(Math.random() * WINDOW_WIDTH - 200),
          );
        }}
      />
      <MyButton
        btStyle={style.button}
        text="Change Value (withRepeat)"
        onPress={() => {
          boxX.value = withRepeat(
            withTiming(Math.random() * WINDOW_WIDTH - 200, {duration: 600}),
            3,
            true,
          );
        }}
      />
    </View>
  );
};

export default Animation3;
