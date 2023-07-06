import React from 'react';
import {View} from 'react-native';
import styles from './style';
import NavButton from '../../../components/NavButton';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RaceComposing from './RaceComposing';
import SimultaneousComposing from './SimultaneousComposing';
import ExclusiveComposing from './ExclusiveCompsing';
import ExternalComposing from './ExternalGestureComposing';

const Stack = createStackNavigator();

const ComposingGesture = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Composing Group" component={ComposingGestureScreen} />
      <Stack.Screen name="RaceComposing" component={RaceComposing} />
      <Stack.Screen
        name="SimultaneousComposing"
        component={SimultaneousComposing}
      />
      <Stack.Screen name="ExclusiveComposing" component={ExclusiveComposing} />
      <Stack.Screen
        name="ExternalGestureComposing"
        component={ExternalComposing}
      />
    </Stack.Navigator>
  );
};

const ComposingGestureScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NavButton
        text="Race Composing (drag - doubletap - longpress)"
        onPress={() => navigation.navigate('RaceComposing')}
      />
      <NavButton
        text="Simultaneous Composing (doubletap - longpress - pinch - rotate)"
        onPress={() => navigation.navigate('SimultaneousComposing')}
      />
      <NavButton
        text="Exclusive Composing (singletap - doubletap - longpress - drag)"
        onPress={() => navigation.navigate('ExclusiveComposing')}
      />
      <NavButton
        text="External Gesture Composing (singletap - longpress)"
        onPress={() => navigation.navigate('ExternalGestureComposing')}
      />
    </View>
  );
};

export default ComposingGesture;
