import {StyleSheet} from 'react-native';

export const boxWidth = 80;
export const boxHeight = 80;

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
  },

  textInBox: {
    height: '100%',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
