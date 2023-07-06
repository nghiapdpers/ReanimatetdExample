import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import {View} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';

const NativeStack = createNativeStackNavigator();

const SharedElementTransition = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="SharedGroup"
        component={SharedElementScreen}
        options={{headerShown: false}}
      />
      <NativeStack.Screen name="ScreenA" component={ScreenA} />
      <NativeStack.Screen name="ScreenB" component={ScreenB} />
    </NativeStack.Navigator>
  );
};

const SharedElementScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NavButton
        text="Screen A"
        onPress={() => navigation.navigate('ScreenA')}
      />
      <NavButton
        text="Screen B"
        onPress={() => navigation.navigate('ScreenB')}
      />
    </View>
  );
};

export default SharedElementTransition;
