import React from 'react';
import {View, Text} from 'react-native';
import style from './style';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import MyButton from '../../../components/MyButton';
import {WINDOW_WIDTH} from '../../../global';

const Animation2 = () => {
  const boxX = useSharedValue(0);
  const [withTimingState, setTimingState] = React.useState('done!');
  const [withSpringState, setSpringState] = React.useState('done!');

  const boxAnimate = useAnimatedStyle(() => {
    const translateX = boxX.value;
    return {
      transform: [{translateX}],
    };
  });

  const boxAnimate1 = useAnimatedStyle(() => {
    const translateX = withTiming(
      boxX.value,
      {
        duration: 1000,
        easing: Easing.inOut(Easing.exp),
      },
      finished => {
        runOnJS(setTimingState)('done!');
      },
    );
    return {
      transform: [{translateX}],
    };
  });

  const boxAnimate2 = useAnimatedStyle(() => {
    const translateX = withSpring(
      boxX.value,
      {
        damping: 15,
        mass: 1,
        stiffness: 200,
      },
      finished => {
        runOnJS(setSpringState)('done!');
      },
    );
    return {
      transform: [{translateX}],
    };
  });

  return (
    <View style={style.container}>
      <Animated.View style={[style.box, boxAnimate]}>
        <Text style={style.text}>Normal</Text>
      </Animated.View>
      <Animated.View style={[style.box, boxAnimate1]}>
        <Text style={style.text}>withTiming</Text>
      </Animated.View>
      <Animated.View style={[style.box, boxAnimate2]}>
        <Text style={style.text}>withSpring</Text>
      </Animated.View>
      <MyButton
        btStyle={style.button}
        text="Change Value"
        onPress={() => {
          setTimingState('moving');
          setSpringState('moving');
          boxX.value = Math.random() * WINDOW_WIDTH - 200;
        }}
      />
      <Text>withTiming state: {withTimingState}</Text>
      <Text>withSpring state: {withSpringState}</Text>
    </View>
  );
};

export default Animation2;
