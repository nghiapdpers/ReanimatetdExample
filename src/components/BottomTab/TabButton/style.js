import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../../global';

export default styles = StyleSheet.create({
  routeName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    // textAlign: 'center',
  },

  button: {
    width: WINDOW_WIDTH / 3,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
