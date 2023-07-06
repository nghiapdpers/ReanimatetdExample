import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {BottomTabNavigationConfig} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import * as React from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import BottomTabBar from '../../components/BottomTab';

type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  TabRouterOptions &
  BottomTabNavigationConfig;

function BottomTabNavigator({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  sceneContainerStyle,
  ...restWithDeprecated
}: Props) {
  const {state, descriptors, navigation, NavigationContent} =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      BottomTabNavigationOptions,
      BottomTabNavigationEventMap
    >(TabRouter, {
      id,
      initialRouteName,
      backBehavior,
      children,
      screenListeners,
      screenOptions,
    });

  const panGesture = Gesture.Pan().onBegin(e => {
    // console.log(e);
  });

  const renderTabBar = () => {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <BottomTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            insets={{
              top: restWithDeprecated.safeAreaInsets?.top ?? insets?.top ?? 0,
              right:
                restWithDeprecated.safeAreaInsets?.right ?? insets?.right ?? 0,
              bottom:
                restWithDeprecated.safeAreaInsets?.bottom ??
                insets?.bottom ??
                0,
              left:
                restWithDeprecated.safeAreaInsets?.left ?? insets?.left ?? 0,
            }}
          />
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  };

  return (
    <NavigationContent>
      <GestureDetector gesture={panGesture}>
        <SafeAreaView style={{flex: 1}}>{renderTabBar()}</SafeAreaView>
      </GestureDetector>
    </NavigationContent>
  );
}

const createCustomBottomNav = createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
  typeof BottomTabNavigator
>(BottomTabNavigator);

export default createCustomBottomNav;
