import ReactNative from 'react-native';

export interface SpinnerProps extends ReactNative.ViewProps {
  data: Array<String>;
  width?: number;
  onItemSelected?: (e: SpinnerItemClickEvent) => void;
}

export type SpinnerItemClickEvent =
  ReactNative.NativeSyntheticEvent<SpinnerItemClickData>;
export interface SpinnerItemClickData {
  id: number;
  item: string;
}
