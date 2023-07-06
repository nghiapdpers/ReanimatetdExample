import Animated, {
  cancelAnimation,
  runOnJS,
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
import {DIRECTION} from './type';
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

export default function ManualGesture2() {
  /******************* */
  //Define variable
  const navigation = useNavigation();
  const longDoublePressHandler = useSharedValue(0); // handler longpress manually
  const pointerTracker = useSharedValue<HandPointerProps>({
    visible: false,
    x: 0,
    y: 0,
  }); //pointer (fingers of user) tracker object
  const pointerActive = useSharedValue(false); // pointer active state
  const headerHeight = useHeaderHeight();
  const [onFullscreen, setOnFullscreen] = React.useState(false); // fullscreen state
  const panDirection = useSharedValue<DIRECTION>(DIRECTION.UNDIFINED); // Direction of pan pangesture

  /******************************* */
  //Gesture
  // Check condition longpress and return readonly shared value: true if longpress and false if otherwise.
  const longDoublePressGesture = useDerivedValue(() => {
    if (longDoublePressHandler.value == 1) {
      return true;
    }
    return false;
  }, []);

  // Gesture manual: it will active if 2 finger press and hold on screen in 700ms, otherwise gesture is fail.
  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e, manager) => {
      if (e.numberOfTouches == 2) {
        manager.begin();
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
    })
    .onTouchesUp((e, manager) => {
      cancelAnimation(longDoublePressHandler);

      if (longDoublePressGesture.value) {
        manager.end();
      } else manager.fail();

      longDoublePressHandler.value = 0;
    })
    .onBegin(e => {
      // Start tracker pointers when user touchs on sreen
      pointerTracker.value = {
        x: e.absoluteX - pointerEdge / 2,
        y: e.absoluteY - pointerEdge / 2 - headerHeight,
        visible: true,
      };
    })
    .onStart(e => {
      pointerActive.value = true;
    })
    .onUpdate(e => {
      // Tracking pointer when it move
      pointerTracker.value = {
        x: e.absoluteX - pointerEdge / 2,
        y: e.absoluteY - pointerEdge / 2 - headerHeight,
        visible: true,
      };
    })
    .onFinalize((e, sc) => {
      // Stop tracking pointer
      pointerTracker.value = {
        x: e.absoluteX - pointerEdge / 2,
        y: e.absoluteY - pointerEdge / 2 - headerHeight,
        visible: false,
      };
      // If gesture completes successfully, will calculate the Direction of gesture
      if (sc) {
        const _angleDeg =
          (Math.atan2(e.translationY, e.translationX) * 180) / Math.PI;

        if (
          (Math.abs(_angleDeg) > 20 && Math.abs(_angleDeg) < 70) ||
          (Math.abs(_angleDeg) > 110 && Math.abs(_angleDeg) < 160)
        ) {
          panDirection.value = DIRECTION.DIAGONAL;
        } else {
          if (Math.abs(e.translationX) > 50) {
            if (e.translationX > 0) {
              panDirection.value = DIRECTION.LEFT_TO_RIGHT;
            } else {
              panDirection.value = DIRECTION.RIGHT_TO_LEFT;
            }
          } else if (Math.abs(e.translationY) > 50) {
            if (e.translationY > 0) {
              panDirection.value = DIRECTION.TOP_TO_BOTTOM;
            } else {
              panDirection.value = DIRECTION.BOTTOM_TO_TOP;
            }
          }
        }
      }

      // and change pointer state is false
      pointerActive.value = false;
    });

  //*************************
  //Animate
  // runOnJS follow docs:
  // https://docs.swmansion.com/react-native-reanimated/docs/api/miscellaneous/runOnJS
  const setScreenOption = (options: Partial<{}>) => {
    navigation.setOptions(options);
  };

  const hideStatusBar = (state: boolean) => {
    StatusBar.setHidden(state, 'slide');
  };

  //change screen options depending on state arguments
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

  // Define animate shared value
  const ttbOutValue = useSharedValue(true);
  const bttOutValue = useSharedValue(true);
  const ltrOutValue = useSharedValue(true);
  const rtlOutValue = useSharedValue(true);

  // change Animate value depending on pan direction.
  const checkout = useDerivedValue(() => {
    switch (panDirection.value) {
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
    <GestureDetector gesture={panGesture}>
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
        <HandPointerElement pointer={pointerTracker} active={pointerActive} />
      </Animated.View>
    </GestureDetector>
  );
}
