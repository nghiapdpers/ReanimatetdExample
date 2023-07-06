import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import style from './style';

export default function ExternalComposing() {
  const rotateRadius = useSharedValue(0);
  const borderR = useSharedValue(0);

  const boxAanimated = useAnimatedStyle(() => {
    const borderRadius = withTiming(borderR.value, {duration: 500});
    return {
      borderRadius,
    };
  }, []);
  const boxBanimated = useAnimatedStyle(() => {
    const rotate = withTiming(`${rotateRadius.value}deg`, {
      duration: 800,
    });
    return {
      transform: [{rotate}],
    };
  }, []);

  const tapA = Gesture.Tap()
    .maxDuration(3000)
    .onStart(e => {
      borderR.value = borderR.value + 20;
    });

  const tapB = Gesture.Tap()
    .onStart(e => {
      rotateRadius.value = rotateRadius.value + 45;
    })
    .simultaneousWithExternalGesture(tapA);

  const longPress = Gesture.LongPress()
    .minDuration(600)
    .onStart(e => {
      rotateRadius.value = 0;
      borderR.value = 0;
    })
    .requireExternalGestureToFail(tapA, tapB);

  const simultaneousGesture = Gesture.Simultaneous(tapA, longPress);

  return (
    <View style={style.container}>
      <GestureDetector gesture={simultaneousGesture}>
        <Animated.View style={[style.boxA, boxAanimated]}>
          <GestureDetector gesture={tapB}>
            <Animated.View style={[style.boxB, boxBanimated]}></Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
