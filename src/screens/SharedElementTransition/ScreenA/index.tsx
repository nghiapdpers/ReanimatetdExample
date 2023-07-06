import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Easing,
  SharedTransition,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import NavButton from '../../../components/NavButton';

const ScreenA = () => {
  const navigation = useNavigation();
  const customAnimate = SharedTransition.custom(values => {
    'worklet';
    return {
      originY: withTiming(values.targetOriginY, {
        duration: 1000,
        easing: Easing.inOut(Easing.exp),
      }),
      originX: withDelay(
        2500,
        withTiming(values.targetOriginX, {
          duration: 1000,
          easing: Easing.inOut(Easing.exp),
        }),
      ),
      width: withDelay(
        1000,
        withTiming(values.targetWidth, {
          duration: 1000,
          easing: Easing.inOut(Easing.exp),
        }),
      ),
      height: withDelay(
        1000,
        withTiming(values.targetHeight, {
          duration: 1000,
          easing: Easing.inOut(Easing.exp),
        }),
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.boxView}>
        <Animated.View
          sharedTransitionTag="uniqueBox"
          sharedTransitionStyle={customAnimate}
          style={styles.uniqueBox}
        />
      </View>
      <NavButton
        text="Go to Screen B"
        onPress={() => navigation.navigate('ScreenB')}
      />
    </View>
  );
};

export default ScreenA;
