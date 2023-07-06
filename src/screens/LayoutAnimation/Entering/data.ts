import {
  FadeInUp,
  SlideInRight,
  BounceIn,
  FlipInYRight,
  StretchInX,
  ZoomInEasyUp,
  LightSpeedInLeft,
  Easing,
  ComplexAnimationBuilder,
} from 'react-native-reanimated';

interface dataType {
  name: string;
  type: ComplexAnimationBuilder | any;
}

const data: dataType[] = [
  {
    name: 'FadeInUp',
    type: FadeInUp.easing(Easing.elastic(3)).duration(500),
  },
  {
    name: 'SlideInRight',
    type: SlideInRight.easing(Easing.inOut(Easing.exp)).duration(500),
  },
  {
    name: 'BounceIn',
    type: BounceIn.duration(500),
  },
  {
    name: 'FlipInYRight',
    type: FlipInYRight.duration(300),
  },
  {
    name: 'StretchInX',
    type: StretchInX.duration(300),
  },
  {
    name: 'ZoomInEasyUp',
    type: ZoomInEasyUp.duration(300),
  },
  {
    name: 'LightSpeedInLeft',
    type: LightSpeedInLeft.duration(500),
  },
];

export default data;
