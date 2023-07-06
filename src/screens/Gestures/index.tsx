import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';

const GestureScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <NavButton
        text="Simple Gesture (Drag)"
        onPress={() => navigation.navigate('SimpleGesture')}
      />
      <NavButton
        text="Composing Gesture"
        onPress={() => navigation.navigate('ComposingGesture')}
      />
      <NavButton
        text="Manual Gesture (longpress before swipe)"
        onPress={() => navigation.navigate('ManualGesture')}
      />
      <NavButton
        text="Manual Gesture 2 (longpress before swipe)"
        onPress={() => navigation.navigate('ManualGesture2')}
      />
    </SafeAreaView>
  );
};

export default GestureScreen;
