import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  boxA: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    zIndex: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  boxB: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    zIndex: 1,
    alignSelf: 'center',
  },
});
