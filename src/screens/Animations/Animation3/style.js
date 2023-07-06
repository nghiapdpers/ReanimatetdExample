import {StyleSheet} from 'react-native';

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
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },

  button: {
    marginVertical: 20,
  },

  text: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  text2: {
    fontSize: 23,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 200,
    padding: 10,
  },
});
