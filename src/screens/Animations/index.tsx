import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimationGesture from '../Animation&Gesture';
import {WINDOW_WIDTH} from '../../global';

const AnimationsScreen = () => {
  const navigation = useNavigation();
  const easterEgg = useSharedValue(false);
  const mainValue = useSharedValue(1);
  const hideWallValue = useSharedValue(0);
  const direction = useSharedValue('none');

  const pan = Gesture.Pan()
    .activeOffsetX([-50, 50])
    .onStart(e => {
      runOnJS(showHeader)(false);
      easterEgg.value = true;
    })
    .onUpdate(e => {
      if (e.translationX > 100) {
        direction.value = 'ltr';
      } else if (e.translationX < 0) {
        direction.value = 'none';
      }
    })
    .onFinalize(e => {
      if (direction.value !== 'ltr') easterEgg.value = false;
    });

  const mainViewAnimate = useAnimatedStyle(() => {
    mainValue.value = withTiming(easterEgg.value ? 0.5 : 1, {duration: 200});
    const opacity = mainValue.value;
    const backgroundColor = interpolateColor(
      mainValue.value,
      [0.5, 1],
      ['grey', 'white'],
      'RGB',
    );
    return {
      backgroundColor,
      opacity,
    };
  }, []);

  const hideWallAnimate = useAnimatedStyle(() => {
    hideWallValue.value = withTiming(easterEgg.value ? 1 : 0, {duration: 500});
    const opacity = hideWallValue.value;
    const translateX =
      direction.value !== 'ltr'
        ? withTiming(
            easterEgg.value ? -WINDOW_WIDTH + 50 : -WINDOW_WIDTH,
            {
              duration: 500,
            },
            () => {
              if (!easterEgg.value) runOnJS(showHeader)(true);
            },
          )
        : withTiming(0, {duration: 700});

    return {
      opacity,
      transform: [{translateX}],
    };
  }, []);

  function showHeader(show: boolean) {
    navigation.setOptions({headerShown: show});
  }

  return (
    <GestureDetector gesture={pan}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.container, mainViewAnimate]}>
          <NavButton
            text="How Shared Value Update"
            onPress={e => {
              navigation.navigate('UpdateSharedValue');
            }}
          />
          <NavButton
            text="Animation 1 (Change Shared Value)"
            onPress={e => {
              navigation.navigate('Animation1');
            }}
          />
          <NavButton
            text="Animation 2 (Custom Animation)"
            onPress={e => {
              navigation.navigate('Animation2');
            }}
          />
          <NavButton
            text="Animation 3 (Modify Animation)"
            onPress={e => {
              navigation.navigate('Animation3');
            }}
          />
          <NavButton
            text="Animation 4 (Animate non view-style props)"
            onPress={e => {
              navigation.navigate('Animation4');
            }}
          />
        </Animated.View>

        <Animated.View style={[styles.hideWall, hideWallAnimate]}>
          <AnimationGesture />
        </Animated.View>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default AnimationsScreen;
