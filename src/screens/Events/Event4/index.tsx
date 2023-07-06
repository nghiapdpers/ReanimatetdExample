import React from 'react';
import {View, PanResponder} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import style, {boxHeight, boxWidth} from './style';
import {useHeaderHeight} from '@react-navigation/elements';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';
import {Icon, IconProps} from '@rneui/themed';

const AnimatedIcon = Animated.createAnimatedComponent(
  React.forwardRef<typeof Icon, IconProps>((props, ref) => {
    return <Icon {...props} />;
  }),
);

const Event4 = () => {
  const headerHeight = useHeaderHeight();
  const pressed = useSharedValue(false);
  const x = useSharedValue(WINDOW_WIDTH - boxWidth / 2);
  const y = useSharedValue(WINDOW_HEIGHT / 2);
  const rotateValue = useSharedValue(0);

  // Gesture
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
      },
    }),
  ).current;

  // Animation
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

    if (x.value > WINDOW_WIDTH / 2) {
      x.value = WINDOW_WIDTH - boxWidth / 2;
    } else {
      x.value = boxWidth / 2;
    }

    return {
      backgroundColor,
      transform: [{translateX}, {translateY}, {scale}],
    };
  }, []);

  const iconAnimate = useAnimatedStyle(() => {
    if (x.value > WINDOW_WIDTH / 2) {
      rotateValue.value = withTiming(180, {duration: 350});
    } else {
      rotateValue.value = withTiming(0, {duration: 350});
    }
    return {
      transform: [{rotateY: `${rotateValue.value}deg`}],
    };
  }, []);

  return (
    <View style={style.container}>
      <Animated.View
        style={[style.box, gestureAnimate]}
        {...panResponder.panHandlers}>
        <AnimatedIcon
          name="chat"
          color={'white'}
          size={boxWidth / 2}
          style={[style.icon, iconAnimate]}
        />
      </Animated.View>
    </View>
  );
};

export default Event4;
