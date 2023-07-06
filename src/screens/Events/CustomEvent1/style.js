import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  mPressable: {
    flex: 3,
    backgroundColor: 'green',
  },

  text: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
});
