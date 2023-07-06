import React from 'react';
import {View, PanResponder} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import style from './style';

const Event1 = () => {
  const pressed = useSharedValue(false);
  const scaleValue = useSharedValue(1);
  const longPress = useSharedValue(1);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        pressed.value = true;
        longPress.value = withTiming(0, {
          duration: 300,
        });
      },

      onPanResponderEnd: () => {
        pressed.value = false;
        scaleValue.value = longPress.value === 0 ? 1 : scaleValue.value + 0.5;
        longPress.value = 1;
      },
    }),
  ).current;

  const gestureAnimate = useAnimatedStyle(() => {
    const backgroundColor = pressed.value ? 'darkorange' : 'chartreuse';
    const scale = withTiming(scaleValue.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.exp),
    });

    return {
      backgroundColor,
      transform: [{scale}],
    };
  }, []);

  return (
    <View style={style.container}>
      <Animated.View
        style={[style.box, gestureAnimate]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default Event1;
