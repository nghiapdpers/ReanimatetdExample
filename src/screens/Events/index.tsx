import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import NavButton from '../../components/NavButton';
import {useNavigation} from '@react-navigation/native';

const EventsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavButton
        text="Event 1 (Press and Long press)"
        onPress={() => navigation.navigate('Event1')}
      />
      <NavButton
        text="Event 2 (Pan - dragged)"
        onPress={() => navigation.navigate('Event2')}
      />
      <NavButton
        text="Event 3 (withDecay)"
        onPress={() => navigation.navigate('Event3')}
      />
      <NavButton
        text="Event 4 (bubbles)"
        onPress={() => navigation.navigate('Event4')}
      />
      <NavButton
        text="Custom Event (Custom UI Component Multiple Pressable)"
        onPress={() => navigation.navigate('CustomEvent')}
      />
      <NavButton
        text="Custom Event (3rd-party Libraries Component)"
        onPress={() => navigation.navigate('CustomEvent2')}
      />
    </View>
  );
};

export default EventsScreen;
