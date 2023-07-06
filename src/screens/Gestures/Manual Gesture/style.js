import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT} from '../../../global';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  pointer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
  },

  ttbImage: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{translateY: -SCREEN_HEIGHT}],
    opacity: 0,
    position: 'absolute',
  },

  bttImage: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{translateY: SCREEN_HEIGHT}],
    opacity: 0,
    position: 'absolute',
  },

  ltrImage: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{translateX: -WINDOW_WIDTH}],
    opacity: 0,
    position: 'absolute',
  },

  rtlImage: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{translateX: WINDOW_WIDTH}],
    opacity: 0,
    position: 'absolute',
  },
});
