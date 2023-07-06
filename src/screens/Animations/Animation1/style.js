import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: 'cyan',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  button: {
    marginVertical: 20,
  },
  text: {
    fontSize: 23,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 200,
    padding: 10,
  },
});
