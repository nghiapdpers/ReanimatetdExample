import {StyleSheet} from 'react-native';

export const boxWidth = 60;
export const boxHeight = 60;

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  box: {
    width: boxWidth,
    height: boxHeight,
    backgroundColor: 'chartreuse',
    borderRadius: boxWidth / 2,
    justifyContent: 'center',
  },

  icon: {
    alignSelf: 'center',
  },
});
