import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT, SCREEN_HEIGHT} from '../../../global';

// original ratio
const SS_WIDTH = 3491;
const SS_HEIGHT = 6365;

// destinaton ratio
const D_WIDTH = WINDOW_WIDTH;
const D_HEIGHT = (SS_HEIGHT / SS_WIDTH) * WINDOW_WIDTH;

// Scale in image from original scale (because resizeMode can reduce image quality)
export function scaleFrLargeRatio(
  width: number,
  height: number,
  x: number = 0,
  y: number = 0,
  center: boolean = false,
) {
  'worklet';
  // if center, calculate x and y to translate
  if (center) {
    x = (WINDOW_WIDTH - width) / 2;
    y = (SCREEN_HEIGHT - height) / 2;
  }

  /**
   * scale and translate image into screen view
    Origin pivot of image (in RN) is center, and transform will depending on this pivot (center).
      *note: -'O': Original ratio (width or height depending on scale with X or Y)
             -'W/H': width or height is passed to function
             -'x/y': x or y is passed to function
             - '÷': division operator.
             - '*': multiple operator.

      *formula: {scaleX/Y : 1 ÷ (O ÷ W/H)
                {translateX/Y: ((-1 * O) ÷ 2 + x/y) * (O ÷ W/H - 1)
  */
  return [
    {scaleX: 1 / (SS_WIDTH / width)},
    {scaleY: 1 / (SS_HEIGHT / height)},
    {translateX: ((-1 * SS_WIDTH) / 2 + x) * (SS_WIDTH / width - 1)},
    {
      translateY: ((-1 * SS_HEIGHT) / 2 + y) * (SS_HEIGHT / height - 1),
    },
  ];
}

// scale image:
const scale = scaleFrLargeRatio(D_WIDTH, D_HEIGHT, 0, 0);

// Zoom in image from original ratio
export function zoomInFormula(
  width: number,
  height: number,
  x: number = 0,
  y: number = 0,
) {
  return [
    ...scale,
    {scaleX: D_WIDTH / width},
    {scaleY: 1 / (SS_HEIGHT / height)},
    {translateX: ((-1 * SS_WIDTH) / 2 + x) * (SS_WIDTH / width - 1)},
    {
      translateY: ((-1 * SS_HEIGHT) / 2 + y) * (SS_HEIGHT / height - 1),
    },
  ];
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  solarsystem: {
    width: SS_WIDTH,
    height: SS_HEIGHT,
    transform: scale,
  },

  background: {
    width: WINDOW_WIDTH * 1.5,
    height: WINDOW_HEIGHT * 1.5,
  },
});

export default style;
