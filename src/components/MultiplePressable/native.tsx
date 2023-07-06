import {MultiplePressableProps} from './types';
import * as RN from 'react-native';

export const MultiplePressNative = RN.requireNativeComponent(
  'RNCMultiplePressable',
) as RN.HostComponent<MultiplePressableProps>;
