/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';

//Screens
import AnimationsScreen from './src/screens/Animations';
import EventsScreen from './src/screens/Events';
import LayoutAnimationScreen from './src/screens/LayoutAnimation';
import BottomTabBar from './src/components/BottomTab';
import SharedElementTransition from './src/screens/SharedElementTransition';
import GestureScreen from './src/screens/Gestures';
import Animation1 from './src/screens/Animations/Animation1';
import Animation2 from './src/screens/Animations/Animation2';
import Animation3 from './src/screens/Animations/Animation3';
import Animation4 from './src/screens/Animations/Animation4';
import UpdateSharedValue from './src/screens/Animations/UpdateSharedValue';
import Event3 from './src/screens/Events/Event3';
import Event1 from './src/screens/Events/Event1';
import Event2 from './src/screens/Events/Event2';
import Event4 from './src/screens/Events/Event4';
import CustomEvent from './src/screens/Events/CustomEvent1';
import CustomEvent2 from './src/screens/Events/CustomEvent2';
import Entering from './src/screens/LayoutAnimation/Entering';
import Exitting from './src/screens/LayoutAnimation/Exitting';
import LayoutTransition from './src/screens/LayoutAnimation/LayoutAnimations';
import KeyframeAnimation from './src/screens/LayoutAnimation/KeyframeAnimations';
import CustomAnimation from './src/screens/LayoutAnimation/CustomAnimations';
import SimpleGesture from './src/screens/Gestures/SimpleGesture';
import ComposingGesture from './src/screens/Gestures/Composing Gesture';
import ManualGesture from './src/screens/Gestures/Manual Gesture';
import AnimatedHeader from './src/components/AniamtedHeader';
import ManualGesture2 from './src/screens/Gestures/Manual Gesture 2';
import SolarSystem from './src/screens/Animation&Gesture/SolarSystem';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: props => <AnimatedHeader {...props} />,
          }}>
          <Stack.Screen
            name="BottomTab"
            component={BottomTabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Animation1" component={Animation1} />
          <Stack.Screen name="Animation2" component={Animation2} />
          <Stack.Screen name="Animation3" component={Animation3} />
          <Stack.Screen name="Animation4" component={Animation4} />
          <Stack.Screen
            name="UpdateSharedValue"
            component={UpdateSharedValue}
          />
          <Stack.Screen
            name="SolarSystem"
            component={SolarSystem}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Event1" component={Event1} />
          <Stack.Screen name="Event2" component={Event2} />
          <Stack.Screen name="Event3" component={Event3} />
          <Stack.Screen name="Event4" component={Event4} />
          <Stack.Screen name="CustomEvent" component={CustomEvent} />
          <Stack.Screen name="CustomEvent2" component={CustomEvent2} />
          <Stack.Screen name="Entering" component={Entering} />
          <Stack.Screen name="Exitting" component={Exitting} />
          <Stack.Screen name="LayoutTransition" component={LayoutTransition} />
          <Stack.Screen
            name="KeyframeAnimation"
            component={KeyframeAnimation}
          />
          <Stack.Screen name="CustomAnimation" component={CustomAnimation} />
          <Stack.Screen name="SimpleGesture" component={SimpleGesture} />
          <Stack.Screen
            name="ComposingGesture"
            component={ComposingGesture}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManualGesture" component={ManualGesture} />
          <Stack.Screen name="ManualGesture2" component={ManualGesture2} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator tabBar={BottomTabBar} initialRouteName="Animations">
      <BottomTab.Screen
        name="Animations"
        component={AnimationsScreen}
        options={{tabBarShowLabel: false}}
      />
      <BottomTab.Screen name="Events" component={EventsScreen} />
      <BottomTab.Screen
        name="LayoutAnimation"
        component={LayoutAnimationScreen}
      />
      <BottomTab.Screen
        name="SharedElement"
        component={SharedElementTransition}
      />
      <BottomTab.Screen name="Gesuture" component={GestureScreen} />
    </BottomTab.Navigator>
  );
};

export type AppRootParamsList = {
  Animation1: undefined;
  Animation2: undefined;
  Animation3: undefined;
  Animation4: undefined;
  UpdateSharedValue: undefined;
  Event1: undefined;
  Event2: undefined;
  Event3: undefined;
  Event4: undefined;
  CustomEvent: undefined;
  CustomEvent2: undefined;
  Entering: undefined;
  Exitting: undefined;
  LayoutTransition: undefined;
  KeyframeAnimation: undefined;
  CustomAnimation: undefined;
  SimpleGesture: undefined;
  ComposingGesture: undefined;
  ManualGesture: undefined;
  ManualGesture2: undefined;
  ScreenA: undefined;
  ScreenB: undefined;
  RaceComposing: undefined;
  SimultaneousComposing: undefined;
  ExclusiveComposing: undefined;
  ExternalGestureComposing: undefined;
  SolarSystem: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamsList {}
  }
}

export default App;
