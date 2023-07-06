import {StyleSheet} from 'react-native';

export const pointerEdge = 30;

export default style = StyleSheet.create({
  pointer: {
    width: pointerEdge,
    height: pointerEdge,
    backgroundColor: 'red',
    borderRadius: pointerEdge,
    position: 'absolute',
    zIndex: 10,
  },
});
