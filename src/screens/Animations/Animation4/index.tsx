import React from 'react';
import {Text, View} from 'react-native';
import style from './style';
import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import MyButton from '../../../components/MyButton';
import ScrollAnimated, {
  ScrollAnimatedAdapter,
} from '../../../components/ScrollAnimated';
import {Svg} from 'react-native-svg';
import CircleAnimated from '../../../components/CircleAnimated';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

const data = new Array(100).fill('omg');

const Animation4 = () => {
  const offsetValue = useSharedValue(0);
  const radius = useSharedValue(30);

  const offsetAnimate = useAnimatedProps(
    () => {
      const scrollToOffset = {
        x: 0,
        y: offsetValue.value,
      };

      return {
        scrollToOffset,
      };
    },
    [],
    ScrollAnimatedAdapter,
  );

  const radiusAnimate = useAnimatedProps(() => {
    return {
      r: radius.value,
    };
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.text}>Custom Component</Text>
      <ScrollAnimated
        style={{flex: 1}}
        children={data.map((item, index) => {
          return (
            <Text key={index}>
              {index} - {item}
            </Text>
          );
        })}
        animatedProps={offsetAnimate} //useAnimateProps
      />
      <MyButton
        btStyle={style.button}
        text="Scroll to random offset"
        onPress={() => {
          offsetValue.value = withTiming(Math.round(Math.random() * 2000), {
            duration: 1500,
            easing: Easing.inOut(Easing.cubic),
          });
        }}
      />

      <Text style={style.text}>3rd-party libraries Components</Text>
      <Svg height={'40%'}>
        <CircleAnimated
          cx={WINDOW_WIDTH / 2}
          cy={WINDOW_HEIGHT / 6}
          r={radius}
          stroke="black"
          strokeWidth="3"
          fill="green"
          // animatedProps={radiusAnimate}
        />
      </Svg>
      <MyButton
        btStyle={style.button}
        text="Change random radius"
        onPress={() => {
          radius.value = withTiming(Math.random() * 150, {
            duration: 3000,
            easing: Easing.inOut(Easing.cubic),
          });
        }}
      />
    </View>
  );
};

export default Animation4;
