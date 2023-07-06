import React from 'react';
import {View, Text, Pressable, GestureResponderEvent} from 'react-native';
import style from './style';

type NavButtonProps = {
  text: string;
  onPress?: (e: GestureResponderEvent) => void;
};

const NavButton: React.FC<NavButtonProps> = ({text, onPress}) => {
  return (
    <View style={style.container}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          pressed ? {opacity: 0.8} : null,
          style.container,
        ]}>
        <Text style={style.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default NavButton;
