import type * as ReactNative from 'react-native';

export type MultiplePressEvent =
  ReactNative.NativeSyntheticEvent<MultiplePressableData>;
export interface MultiplePressableData {
  click: number;
  previousTimeStamp: number;
}

export interface MultiplePressableProps extends ReactNative.ViewProps {
  delay?: number;
  onMultiplePress?: (event: MultiplePressEvent) => void;
}
