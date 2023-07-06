import {Dimensions, StatusBar} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCALE = Dimensions.get('window').scale;
export const FONT_SCALE = Dimensions.get('window').fontScale;
export const STATUSBAR_HEIGHT = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 0;
