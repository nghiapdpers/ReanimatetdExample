import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 10,
  },

  layoutView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  viewBox: {
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: 'indianred',
    marginVertical: 5,
    marginHorizontal: 5,
  },

  text: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,
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

  nav: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
