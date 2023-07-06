import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';
import {Icon} from '@rneui/themed';
import style from './style';
import Animated, {StretchInY, StretchOutY} from 'react-native-reanimated';

type TabButtonType = {
  iconName: string;
  routeName: string;
  isFocused: boolean;
  onPress: (e: GestureResponderEvent) => void;
};

const TabButton: React.FC<TabButtonType> = ({
  iconName,
  routeName,
  isFocused,
  onPress,
}) => {
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Icon name={iconName} type="font-awesome-5" size={30} color={'white'} />
      {isFocused ? (
        <Animated.Text
          style={style.routeName}
          children={routeName}
          numberOfLines={1}
          entering={StretchInY}
          exiting={StretchOutY}
        />
      ) : null}
    </Pressable>
  );
};

export default TabButton;
