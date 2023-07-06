import React from 'react';
import {View, PanResponder} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import style, {boxHeight, boxWidth} from './style';
import {useHeaderHeight} from '@react-navigation/elements';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

const Event2 = () => {
  const headerHeight = useHeaderHeight();
  const pressed = useSharedValue(false);
  const x = useSharedValue(WINDOW_WIDTH / 2);
  const y = useSharedValue(WINDOW_HEIGHT / 2);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        pressed.value = true;
      },

      onPanResponderMove: (e, gesture) => {
        x.value = gesture.moveX;
        y.value = gesture.moveY - headerHeight;
      },

      onPanResponderEnd: () => {
        pressed.value = false;
        x.value = WINDOW_WIDTH / 2;
        y.value = WINDOW_HEIGHT / 2;
      },
    }),
  ).current;

  const gestureAnimate = useAnimatedStyle(() => {
    const backgroundColor = pressed.value ? 'darkorange' : 'chartreuse';
    const scale = withSpring(pressed.value ? 1.2 : 1, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });
    const translateX = withSpring(x.value - boxWidth / 2, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });
    const translateY = withSpring(y.value - boxHeight / 2, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });

    return {
      backgroundColor,
      transform: [{translateX}, {translateY}, {scale}],
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

export default Event2;
