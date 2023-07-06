import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';

const AnimationGestureScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavButton
        text="Solar System"
        onPress={() => navigation.navigate('SolarSystem')}
      />
    </View>
  );
};

export default AnimationGestureScreen;
