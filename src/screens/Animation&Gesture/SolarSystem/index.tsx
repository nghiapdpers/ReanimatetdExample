import {ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import style from './style';
import Animated, {
  SlideInUp,
  SlideOutUp,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';

export default function SolarSystem() {
  const navigation = useNavigation();
  const prepareBack = useSharedValue(false); // value which change before navigation.goBack() action
  const [goBack, setGoBack] = React.useState(false); // react state control back action

  // If screen is focus, hide status bar and system navigation bar.
  useFocusEffect(() => {
    setStatusBarHidden(true);
    SystemNavigationBar.navigationHide();
  });

  // use runOnJS follow docs:
  // https://docs.swmansion.com/react-native-reanimated/docs/api/miscellaneous/runOnJS
  function goBackScreen() {
    navigation.goBack();
  }

  function prepareGoBackFunc() {
    setStatusBarHidden(false);
    SystemNavigationBar.navigationShow();
  }

  function setStatusBarHidden(hidden: boolean) {
    StatusBar.setHidden(hidden, 'slide');
  }

  // Detect when prepareBack value change, set goBack state is true to active animation of image
  useDerivedValue(() => {
    if (prepareBack.value) {
      runOnJS(setGoBack)(true);
    }
  });

  // Gesture to tap on planet
  const tap = Gesture.Tap().onStart(e => {
    console.log(e);
  });

  // Gesture to active prepareBack shared value
  const pan = Gesture.Pan().onFinalize(e => {
    if (e.translationX < 0 && Math.abs(e.translationX) > 50) {
      prepareBack.value = true;
    }
  });

  // Composing gesture
  const systemGesture = Gesture.Race(tap, pan);

  return (
    <GestureDetector gesture={systemGesture}>
      <SafeAreaView style={style.container}>
        <ImageBackground
          style={style.background}
          source={require('../../../assets/solarsystem.jpg')}
          blurRadius={10}>
          {!goBack ? (
            <Animated.Image
              source={require('../../../assets/solarsystem.jpg')}
              style={style.solarsystem}
              entering={SlideInUp.duration(1500)}
              exiting={SlideOutUp.duration(1500).withCallback(finished => {
                'worklet';
                // when animation is invoked, run this callback
                runOnJS(prepareGoBackFunc)();
                if (finished) {
                  runOnJS(goBackScreen)();
                }
              })}
            />
          ) : null}
        </ImageBackground>
      </SafeAreaView>
    </GestureDetector>
  );
}
