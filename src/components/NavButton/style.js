import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../global';

export default style = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH * 0.9,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkcyan',
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
