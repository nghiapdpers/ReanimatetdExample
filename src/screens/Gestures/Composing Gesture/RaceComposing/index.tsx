import React from 'react';
import {View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import style, {boxHeight, boxWidth} from './style';
import {useHeaderHeight} from '@react-navigation/elements';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../global';

const RaceComposing = () => {
  const headerHeight = useHeaderHeight();
  const pressed = useSharedValue(false);
  const x = useSharedValue(WINDOW_WIDTH / 2);
  const y = useSharedValue(WINDOW_HEIGHT / 2);
  const squareEdge = useSharedValue(boxWidth);

  const dragged = Gesture.Pan()
    .onBegin(e => {
      pressed.value = true;
    })
    .onUpdate(e => {
      x.value = e.absoluteX;
      y.value = e.absoluteY - headerHeight;
    })
    .onFinalize(e => {
      pressed.value = false;
    });

  const doubleTap = Gesture.Tap()
    .maxDelay(300)
    .maxDuration(700)
    .numberOfTaps(2)
    .onStart(e => {
      squareEdge.value = squareEdge.value + 50;
    })
    .onFinalize(e => {
      pressed.value = false;
    });

  const longPress = Gesture.LongPress()
    .minDuration(600)
    .onBegin(e => {
      pressed.value = true;
    })
    .onStart(e => {
      x.value = WINDOW_WIDTH / 2;
      y.value = WINDOW_HEIGHT / 2;
      squareEdge.value = boxHeight;
    })
    .onFinalize(e => {
      pressed.value = false;
    });

  const raceComposing = Gesture.Race(dragged, doubleTap, longPress);

  const gestureAnimate = useAnimatedStyle(() => {
    const backgroundColor = pressed.value ? 'darkorange' : 'darkgreen';
    const scale = withSpring(pressed.value ? 1.2 : 1, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });
    const translateX = withSpring(x.value - squareEdge.value / 2, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });
    const translateY = withSpring(y.value - squareEdge.value / 2, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });
    const square = withTiming(squareEdge.value, {duration: 400});

    return {
      backgroundColor,
      transform: [{translateX}, {translateY}, {scale}],
      width: square,
      height: square,
      borderRadius: squareEdge.value,
    };
  }, []);

  return (
    <View style={style.container}>
      <GestureDetector gesture={raceComposing}>
        <Animated.View style={[style.box, gestureAnimate]}>
          <Text style={style.textInBox}>
            THIS IS A CIRCLE WITH LINE IN CENTER
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default RaceComposing;
