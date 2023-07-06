import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import style from './style';
import {
  STATE,
  DIRECTION,
  PanDoubleGestureHandlerType,
  PanGestureType,
} from './type';
import HandPointerElement from '../../../components/HandPointer';
import {HandPointerProps} from '../../../components/HandPointer/type';
import {pointerEdge} from '../../../components/HandPointer/style';
import {useNavigation} from '@react-navigation/native';
import mySystemNavigation from '../../../modules/MySystemNavigation';
import {animateTTB, animateBTT, animateRTL, animateLTR} from './animate';

const images = [
  require('../../../assets/image1.jpg'),
  require('../../../assets/image2.jpg'),
  require('../../../assets/image3.jpg'),
  require('../../../assets/image4.jpg'),
];

export default function ManualGesture() {
  /******************* */
  //Define variable
  const navigation = useNavigation();
  const manualGesture = Gesture.Manual();
  const longDoublePressHandler = useSharedValue(0);
  const panDoubleGestureHandler = useSharedValue<PanDoubleGestureHandlerType[]>(
    [],
  );
  const pointerTraker: Animated.SharedValue<HandPointerProps>[] = [];
  const pointerActive = useSharedValue(false);
  const headerHeight = useHeaderHeight();
  const panDoubleGesture = useSharedValue<PanGestureType>({
    direction: DIRECTION.UNDIFINED,
    state: STATE.UNDIFINED,
  });
  const [onFullscreen, setOnFullscreen] = React.useState(false);

  /******************************* */
  //Gesture
  for (let i = 0; i < 2; i++) {
    pointerTraker[i] = useSharedValue<HandPointerProps>({
      x: 0,
      y: 0,
      visible: false,
    });
  }

  const longDoublePressGesture = useDerivedValue(() => {
    if (longDoublePressHandler.value == 1) {
      return true;
    }
    return false;
  }, []);

  const myPan = useAnimatedReaction(
    () => {
      const touchEvent = panDoubleGestureHandler.value;
      let _direction = DIRECTION.UNDIFINED;
      let _state = panDoubleGestureHandler.value[0]?.state;

      if (
        touchEvent.findIndex(item => item.state === STATE.MOVE) != -1 &&
        touchEvent[0].current_x &&
        touchEvent[0].target_x &&
        touchEvent[0].current_y &&
        touchEvent[0].target_y
      ) {
        const _distanceX = touchEvent[0].target_x - touchEvent[0].current_x;
        const _distanceY = touchEvent[0].target_y - touchEvent[0].current_y;
        const _angleDeg = (Math.atan2(_distanceY, _distanceX) * 180) / Math.PI;
        if (
          (Math.abs(_angleDeg) > 20 && Math.abs(_angleDeg) < 70) ||
          (Math.abs(_angleDeg) > 110 && Math.abs(_angleDeg) < 160)
        ) {
          _direction = DIRECTION.DIAGONAL;
        } else if (Math.abs(_distanceX) > 50) {
          if (touchEvent[0].current_x > touchEvent[0].target_x) {
            _direction = DIRECTION.RIGHT_TO_LEFT;
          } else {
            _direction = DIRECTION.LEFT_TO_RIGHT;
          }
        } else if (Math.abs(_distanceY) > 50) {
          if (touchEvent[0].current_y > touchEvent[0].target_y) {
            _direction = DIRECTION.BOTTOM_TO_TOP;
          } else {
            _direction = DIRECTION.TOP_TO_BOTTOM;
          }
        }
      }
      return {
        direction: _direction,
        state: _state,
      };
    },
    (result, previous) => {
      if (result.state === STATE.END && previous) {
        panDoubleGesture.value = {
          direction: previous.direction,
          state: result.state,
        };
      }
    },
  );

  manualGesture.onTouchesDown((e, manager) => {
    'worklet';

    if (e.numberOfTouches == 2) {
      e.allTouches.forEach((item, id) => {
        manager.begin();
        pointerTraker[id].value = {
          x: item.absoluteX - pointerEdge / 2,
          y: item.absoluteY - pointerEdge / 2 - headerHeight,
          visible: true,
        };
      });

      longDoublePressHandler.value = withTiming(
        1,
        {
          duration: 700,
        },
        finished => {
          if (finished) manager.activate();
        },
      );
    }

    panDoubleGestureHandler.value = e.allTouches.map(item => {
      return {
        id: item.id,
        current_x: item.absoluteX,
        current_y: item.absoluteY,
        state: STATE.START,
      };
    });
  });

  manualGesture.onTouchesMove(e => {
    'worklet';
    if (longDoublePressGesture.value) {
      e.allTouches.forEach((item, id) => {
        pointerTraker[id].value = {
          x: item.absoluteX - pointerEdge / 2,
          y: item.absoluteY - pointerEdge / 2 - headerHeight,
          visible: true,
        };
      });

      panDoubleGestureHandler.value = e.allTouches.map((item, index) => {
        return {
          id: item.id,
          current_x: panDoubleGestureHandler.value[index].current_x,
          current_y: panDoubleGestureHandler.value[index].current_y,
          target_x: item.absoluteX,
          target_y: item.absoluteY,
          state: STATE.MOVE,
        };
      });
    }
  });

  manualGesture.onTouchesUp((e, manager) => {
    'worklet';
    cancelAnimation(longDoublePressHandler);

    e.allTouches.forEach((item, id) => {
      pointerTraker[id].value = {
        x: item.absoluteX - pointerEdge / 2,
        y: item.absoluteY - pointerEdge / 2 - headerHeight,
        visible: false,
      };
    });

    if (longDoublePressGesture.value) {
      panDoubleGestureHandler.value = e.allTouches.map(item => {
        return {
          id: item.id,
          current_x: 0,
          current_y: 0,
          target_x: 0,
          target_y: 0,
          state: STATE.END,
        };
      });
      manager.end();
    } else manager.fail();

    longDoublePressHandler.value = 0;
  });

  manualGesture
    .onStart(e => {
      'worklet';
      pointerActive.value = true;
    })
    .onFinalize((e, sc) => {
      'worklet';
      pointerActive.value = false;
    });

  //*************************
  //Animate
  const setScreenOption = (options: Partial<{}>) => {
    navigation.setOptions(options);
  };

  const hideStatusBar = (state: boolean) => {
    StatusBar.setHidden(state, 'slide');
  };

  const fullscreen = (state: boolean) => {
    setScreenOption({
      showHeader: !state,
    });
    state
      ? mySystemNavigation.navigationHide()
      : mySystemNavigation.navigationShow();
    hideStatusBar(state);
    if (state) setOnFullscreen(true);
    else setOnFullscreen(false);
  };

  const ttbOutValue = useSharedValue(true);
  const bttOutValue = useSharedValue(true);
  const ltrOutValue = useSharedValue(true);
  const rtlOutValue = useSharedValue(true);

  const checkout = useDerivedValue(() => {
    switch (panDoubleGesture.value.direction) {
      case DIRECTION.TOP_TO_BOTTOM:
        ttbOutValue.value = false;
        bttOutValue.value = true;
        ltrOutValue.value = true;
        rtlOutValue.value = true;
        if (!onFullscreen) runOnJS(fullscreen)(true);
        break;
      case DIRECTION.BOTTOM_TO_TOP:
        bttOutValue.value = false;
        ttbOutValue.value = true;
        ltrOutValue.value = true;
        rtlOutValue.value = true;
        if (!onFullscreen) runOnJS(fullscreen)(true);
        break;
      case DIRECTION.LEFT_TO_RIGHT:
        ltrOutValue.value = false;
        ttbOutValue.value = true;
        bttOutValue.value = true;
        rtlOutValue.value = true;
        if (!onFullscreen) runOnJS(fullscreen)(true);
        break;
      case DIRECTION.RIGHT_TO_LEFT:
        rtlOutValue.value = false;
        ttbOutValue.value = true;
        bttOutValue.value = true;
        ltrOutValue.value = true;
        if (!onFullscreen) runOnJS(fullscreen)(true);
        break;

      case DIRECTION.DIAGONAL:
        ttbOutValue.value = true;
        bttOutValue.value = true;
        ltrOutValue.value = true;
        rtlOutValue.value = true;
        runOnJS(fullscreen)(false);
        runOnJS(setOnFullscreen)(false);
        break;
    }
  }, []);

  const customAnimateTTB = useAnimatedStyle(
    () => animateTTB(ttbOutValue.value),
    [animateTTB],
  );

  const customAnimateBTT = useAnimatedStyle(
    () => animateBTT(bttOutValue.value),
    [animateBTT],
  );

  const customAnimateRTL = useAnimatedStyle(
    () => animateRTL(rtlOutValue.value),
    [animateRTL],
  );

  const customAnimateLTR = useAnimatedStyle(
    () => animateLTR(ltrOutValue.value),
    [animateLTR],
  );

  return (
    <GestureDetector gesture={manualGesture}>
      <Animated.View style={[style.container]}>
        <Animated.Image
          source={images[0]}
          resizeMode={'stretch'}
          style={[style.ttbImage, customAnimateTTB]}
        />
        <Animated.Image
          source={images[1]}
          resizeMode={'stretch'}
          style={[style.bttImage, customAnimateBTT]}
        />
        <Animated.Image
          source={images[2]}
          resizeMode={'stretch'}
          style={[style.ltrImage, customAnimateLTR]}
        />
        <Animated.Image
          source={images[3]}
          resizeMode={'stretch'}
          style={[style.rtlImage, customAnimateRTL]}
        />
        {pointerTraker.map((pointer, id) => {
          return (
            <HandPointerElement
              pointer={pointer}
              active={pointerActive}
              key={id}
            />
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
}
