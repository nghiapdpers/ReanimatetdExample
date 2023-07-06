import React from 'react';
import {Text, View} from 'react-native';
import style from './style';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
} from 'react-native-reanimated';
import MyButton from '../../../components/MyButton';
import {WINDOW_WIDTH} from '../../../global';
import {useNavigation} from '@react-navigation/native';

const Animation1 = () => {
  const navigation = useNavigation();
  const boxX = useSharedValue(WINDOW_WIDTH / 2 - 50);

  const boxAnimate = useAnimatedStyle(() => {
    const translateX = boxX.value;
    return {
      transform: [{translateX}],
    };
  });

  return (
    <View style={style.container}>
      <Animated.View style={[style.box, boxAnimate]}></Animated.View>
      <MyButton
        btStyle={style.button}
        text="Change Value"
        onPress={() => (boxX.value = (Math.random() * WINDOW_WIDTH) / 1.5)}
      />
      <MyButton
        btStyle={style.button}
        text="Change Value (withTiming)"
        onPress={() =>
          (boxX.value = withTiming((Math.random() * WINDOW_WIDTH) / 1.5, {
            duration: 1000,
          }))
        }
      />
      <MyButton
        btStyle={style.button}
        text="Change Value (withSpring)"
        onPress={() =>
          (boxX.value = withSpring((Math.random() * WINDOW_WIDTH) / 1.5, {}))
        }
      />
    </View>
  );
};

export default Animation1;
