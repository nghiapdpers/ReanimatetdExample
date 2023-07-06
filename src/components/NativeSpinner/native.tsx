import * as ReactNative from 'react-native';
import {SpinnerProps} from './type';

export const NativeSpinner = ReactNative.requireNativeComponent(
  'RNCustomSpinner',
) as ReactNative.HostComponent<SpinnerProps>;
