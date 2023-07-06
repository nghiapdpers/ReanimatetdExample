import React from 'react';
import {View, Pressable, PanResponder} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';
import style, {boxHeight, boxWidth} from './style';
import {WINDOW_HEIGHT, WINDOW_WIDTH, STATUSBAR_HEIGHT} from '../../../global';

const Event3 = () => {
  const headerHeight = useHeaderHeight();
  const pressed = useSharedValue(false);
  const xValue = useSharedValue(WINDOW_WIDTH / 2);
  const yValue = useSharedValue(WINDOW_HEIGHT);
  const velocityMulti = 100;

  //Define area which object can move and bouces
  //Định nghĩa khu vực di chuyển của object
  const gestureWidth = WINDOW_WIDTH - boxWidth;
  const gestureHeight =
    WINDOW_HEIGHT - STATUSBAR_HEIGHT - headerHeight - boxHeight;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        pressed.value = true;
      },

      onPanResponderMove: (e, gestureState) => {
        xValue.value = gestureState.moveX;
        yValue.value = gestureState.moveY - headerHeight;
      },

      onPanResponderEnd: (e, gestureState) => {
        xValue.value = withDecay({
          velocity: gestureState.vx * velocityMulti,
          deceleration: 0.9999,
          velocityFactor: 3,
        });
        yValue.value = withDecay({
          velocity: gestureState.vy * velocityMulti,
          deceleration: 0.9999,
          velocityFactor: 3,
        });

        pressed.value = false;
      },
    }),
  ).current;

  const gestureAnimate = useAnimatedStyle(() => {
    const backgroundColor = pressed.value ? 'red' : 'cyan';
    const scale = withSpring(pressed.value ? 1.2 : 1, {
      damping: 500,
      mass: 0.5,
      stiffness: 100,
    });

    //Calculate distance of x-axis, y-axis of circle:
    //Tính toán quãng đường của vật theo trục x, y:
    const distanceX = xValue.value - boxWidth / 2;
    const distanceY = yValue.value - boxHeight / 2;

    //Calculate the number of bounces of x-axis, y-axis:
    //Tính toán số lần nẩy lại theo trục x, y
    const bouncesX = Math.floor(distanceX / gestureWidth);
    const bouncesY = Math.floor(distanceY / gestureHeight);

    //Calculate the remainder of distance x-axis, y-axis:
    //Tính toán phần dư còn lại của quãng đường sau nếu số lần nảy lớn hơn 0
    const remainderX = distanceX - gestureWidth * bouncesX;
    const remainderY = distanceY - gestureHeight * bouncesY;

    //Define translate value:
    let translateX: number = 0;
    let translateY: number = 0;

    //Prevent circle translate out of screen - x-axis, and can bouces
    if (bouncesX % 2 != 0) {
      translateX = gestureWidth - remainderX;
    }
    if (bouncesX % 2 == 0) {
      translateX = remainderX;
    }

    //Prevent circle translate out of screen - y-axis, and can bounces
    if (bouncesY % 2 != 0) {
      translateY = gestureHeight - remainderY;
    }
    if (bouncesY % 2 == 0) {
      translateY = remainderY;
    }

    /*
    Logic is: 
      - In initial render, the bounces is 0, so the remainder is distance. After that, 
      if distance greater than gestureWidth, the bounces will be calculated
      using function Math.floor(). And then, the remainder will be calculated using 
      the calculated bounces. If the bounces is odd, translate value will be calculated
      using formula: gesture(width or height) subtract remainder. Ortherwise, if the bounces
      is even, the translate value is remainder.
      (- Ở lần render đầu tiên, bounces là 0, do đó nên remainder cũng chính distance. Sau đó, nếu distance lớn hơn 0 thì bounces sẽ được tính toán bằng hàm Math.floor(). Và remainder sẽ được tính toán dựa trên bounces đã được tính. Nếu bounces là số lẻ, thì giá trị translate sẽ được tính toán bằng công thức: gesture(width hoặc height) trừ remainder. Ngược lại, nếu bounces là số chẵn thì giá trị translate chính bằng remainder.)
      Example: distanceX = 150, gestureWidth = 330
        - Inital render:
            bouncesX = Math.floor(150/330) = 0
            remainderX = distance - gestureWidth*bounces
                      = 150 - 330*0 = 150
            bouncesX % 2 is true => translateX = remainderX = 150.
        - Press object and swipe from left to right => distaceX animating from 150 to 931: 
          (Ấn giữ object và vuốt từ trái sang phải => distanceX di chuyển từ 150 tới 931)
              ...
              distanceX = 331:
              bounces = 1
              remainderX = 331 - 330*1 = 1
              bouncesX % 2 is false => translateX = 330 - 1 = 329
              ***
              distanceX = 332:
              bounces = 1
              remainderX = 331 - 330*1 = 2
              bouncesX % 2 is false => translateX = 330 - 2 = 328
              ...
              distanceX = 661:
              bounces = 2
              remainderX = 661 - 330*2 = 1
              bouncesX % 2 is true => translateX = 1
              ***
              distanceX = 662:
              bounces = 2
              remainderX = 662 - 330*2 = 2
              bouncesX % 2 is true => translateX = 2
              ...
        - Press object and swipe from right to left => distaceX animating from 150 to -700: 
          (Ấn giữ object và vuốt từ phải sang trái => distanceX di chuyển từ 150 tới -700)
              ...
              distanceX = -1:
              bounces = -1
              remainderX = -1 - 330*-1 = -1 + 330 = 329
              bouncesX % 2 is false => translateX = 330 - 329 = 1
              ***
              distanceX = -2:
              bounces = -1
              remainderX = -2 - 330*-1 = -2 + 330 = 328
              bouncesX % 2 is false => translateX = 330 - 328 = 2
              ...
              distanceX = -331:
              bounces = -2
              remainderX = -331 - 330*-2 = -331 + 660 = 329
              bouncesX % 2 is true => translateX = 329
              ***
              distanceX = -332:
              bounces = -2
              remainderX = -332 - 330*-2 = -332 + 660 = 328
              bouncesX % 2 is true => translateX = 328
              ...
    */

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

export default Event3;
