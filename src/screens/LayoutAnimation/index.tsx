import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';

const LayoutAnimationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NavButton
        text="Entering Animation"
        onPress={() => navigation.navigate('Entering')}
      />
      <NavButton
        text="Exitting Animation"
        onPress={() => navigation.navigate('Exitting')}
      />
      <NavButton
        text="Layout Transition"
        onPress={() => navigation.navigate('LayoutTransition')}
      />
      <NavButton
        text={`Keyframe animation\n(custom animation with keyframe)`}
        onPress={() => navigation.navigate('KeyframeAnimation')}
      />
      <NavButton
        text={`Custom Animations`}
        onPress={() => navigation.navigate('CustomAnimation')}
      />
    </View>
  );
};

export default LayoutAnimationScreen;
