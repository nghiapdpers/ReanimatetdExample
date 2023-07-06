import React from 'react';
import {View, PanResponder, Text, ProgressViewIOSBase} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import style, {boxHeight, boxWidth} from './style';
import {useHeaderHeight} from '@react-navigation/elements';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../../global';

const SimultaneousComposing = () => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(WINDOW_WIDTH / 2);
  const y = useSharedValue(WINDOW_HEIGHT / 2);
  const squareEdge = useSharedValue(boxWidth);
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

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
      scaleValue.value = 1;
      rotateValue.value = 0;
    })
    .onFinalize(e => {
      pressed.value = false;
    });

  const rotate = Gesture.Rotation()
    .onStart(e => {})
    .onUpdate(e => {
      rotateValue.value = e.rotation;
    })
    .onEnd(e => {});

  const scale = Gesture.Pinch()
    .onStart(e => {})
    .onUpdate(e => {
      scaleValue.value = e.scale;
    })
    .onEnd(e => {});

  const simultaneousComposing = Gesture.Simultaneous(
    doubleTap,
    longPress,
    rotate,
    scale,
  );

  const gestureAnimate = useAnimatedStyle(() => {
    const backgroundColor = pressed.value ? 'darkorange' : 'darkblue';
    const scale = scaleValue.value;
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
    const rotateZ = `${(rotateValue.value / Math.PI) * 180}deg`;

    return {
      backgroundColor,
      transform: [{translateX}, {translateY}, {scale}, {rotateZ}],
      width: square,
      height: square,
      borderRadius: squareEdge.value,
    };
  }, []);

  return (
    <View style={style.container}>
      <GestureDetector gesture={simultaneousComposing}>
        <Animated.View style={[style.box, gestureAnimate]}>
          <Text style={style.textInBox}>
            THIS IS A CIRCLE WITH LINE IN CENTER
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SimultaneousComposing;
