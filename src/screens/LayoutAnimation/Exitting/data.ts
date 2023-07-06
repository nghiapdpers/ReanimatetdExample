import {
  FadeInUp,
  SlideInRight,
  SlideOutLeft,
  BounceIn,
  BounceOut,
  FlipInYRight,
  FlipOutYLeft,
  StretchInX,
  StretchOutX,
  ZoomInEasyUp,
  ZoomOutEasyDown,
  LightSpeedInLeft,
  LightSpeedOutRight,
  Easing,
  ComplexAnimationBuilder,
  FadeOut,
  ZoomOutEasyUp,
} from 'react-native-reanimated';

interface dataType {
  name: string;
  enter: ComplexAnimationBuilder | any;
  exit: ComplexAnimationBuilder | any;
}

const data: dataType[] = [
  {
    name: 'FadeOut',
    enter: FadeInUp.easing(Easing.elastic(3)).duration(500),
    exit: FadeOut.duration(500),
  },
  {
    name: 'SlideOutLeft',
    enter: SlideInRight.easing(Easing.inOut(Easing.exp)).duration(500),
    exit: SlideOutLeft.easing(Easing.inOut(Easing.exp)).duration(500),
  },
  {
    name: 'BounceOut',
    enter: BounceIn.duration(500),
    exit: BounceOut.duration(500),
  },
  {
    name: 'FlipOutYLeft',
    enter: FlipInYRight.duration(500),
    exit: FlipOutYLeft.duration(500),
  },
  {
    name: 'StretchOutX',
    enter: StretchInX.duration(500),
    exit: StretchOutX.duration(500),
  },
  {
    name: 'ZoomOutEasyDown',
    enter: ZoomInEasyUp.duration(500),
    exit: ZoomOutEasyUp.duration(500),
  },
  {
    name: 'LightSpeedOutRight',
    enter: LightSpeedInLeft.duration(500),
    exit: LightSpeedOutRight.duration(500),
  },
];

export default data;
