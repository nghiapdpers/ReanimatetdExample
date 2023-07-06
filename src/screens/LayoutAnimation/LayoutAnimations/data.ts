import {
  Layout,
  SequencedTransition,
  FadingTransition,
  JumpingTransition,
  CurvedTransition,
  EntryExitTransition,
  ComplexAnimationBuilder,
  Easing,
  combineTransition,
  LightSpeedOutLeft,
  LightSpeedInRight,
  PinwheelIn,
  PinwheelOut,
  FadeIn,
  FadeInUp,
  FadeInDown,
  LightSpeedInLeft,
} from 'react-native-reanimated';

interface dataType {
  name: string;
  layout: ComplexAnimationBuilder | any;
}

const data: dataType[] = [
  {
    name: 'Layout',
    layout: Layout.duration(500).easing(Easing.bezierFn(0.25, 1, 0.5, 1)),
  },
  {
    name: 'SequencedTransition',
    layout: SequencedTransition.duration(500),
  },
  {
    name: 'FadingTransition',
    layout: FadingTransition.duration(500).delay(150),
  },
  {
    name: 'JumpingTransition',
    layout: JumpingTransition.duration(500),
  },
  {
    name: 'CurvedTransition',
    layout: CurvedTransition.duration(500),
  },
  {
    name: 'EntryExitTransition',
    layout: EntryExitTransition.entering(
      LightSpeedInRight.duration(450).delay(150),
    )
      .exiting(PinwheelOut.duration(300))
      .delay(100),
  },
];

export default data;
