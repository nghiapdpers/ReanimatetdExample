import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 40,
  },

  flatlist: {
    alignSelf: 'center',
  },

  text: {
    height: WINDOW_HEIGHT * 0.08,
    width: WINDOW_WIDTH * 0.94,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: 'indianred',
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },

  buttongroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  button: {
    width: 120,
    marginHorizontal: 5,
    marginTop: 20,
  },

  buttonList: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
  },

  renderButton: {
    marginHorizontal: 5,
    backgroundColor: 'maroon',
  },
});
