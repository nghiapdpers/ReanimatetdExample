import React from 'react';
import MyButton from '../../../components/MyButton';
import {Text, View} from 'react-native';
import style from './style';
import {useSharedValue, runOnUI} from 'react-native-reanimated';

const UpdateSharedValue = () => {
  const sharedValue = useSharedValue(0);

  const updateValue = (value: number, threadName: string) => {
    'worklet';
    sharedValue.value = value;
    console.log(
      'From the ',
      threadName,
      ' thread, sharedValue: ',
      sharedValue.value,
    );
  };

  const synchronous = () => {
    runOnUI(updateValue)(Math.round(Math.random() * 100), 'UI');
  };

  const asynchronous = () => {
    updateValue(1, 'React Native JS');
  };

  return (
    <View style={style.container}>
      <MyButton
        btStyle={style.button}
        text="runOnUI (Synchronous Update)"
        onPress={synchronous}
      />
      <MyButton
        btStyle={style.button}
        text="runOnJS (Asynchronous Update)"
        onPress={asynchronous}
      />
    </View>
  );
};

export default UpdateSharedValue;
