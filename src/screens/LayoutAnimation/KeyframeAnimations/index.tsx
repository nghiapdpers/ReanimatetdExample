import React from 'react';
import {
  FlatList,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  ComplexAnimationBuilder,
  Easing,
  Keyframe,
  Layout,
} from 'react-native-reanimated';
import style from './style';
import MyButton from '../../../components/MyButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

interface renderItemType {
  item?: string;
  onPress?: () => void;
  ctStyle?: StyleProp<ViewStyle>;
}

const ListRow = ({
  item,
  onPress,
  ctStyle,
}: renderItemType): React.ReactElement => {
  const EnterFromRight = new Keyframe({
    from: {
      transform: [{translateX: 100}, {scale: 0.7}],
      opacity: 0.3,
      zIndex: 1,
    },

    to: {
      transform: [{translateX: 0}, {scale: 1}],
      opacity: 1,
      zIndex: 1,
      easing: Easing.in(Easing.exp),
    },
  });

  const ExitFromLeft = new Keyframe({
    0: {
      transform: [{translateX: 0}, {scale: 1}],
      opacity: 1,
      zIndex: -1,
    },

    100: {
      transform: [{translateX: -100}, {scale: 0.5}],
      opacity: 0.3,
      zIndex: -1,
      easing: Easing.out(Easing.quad),
    },
  });

  return (
    <Animated.View
      entering={EnterFromRight.duration(350)}
      exiting={ExitFromLeft.duration(300)}
      layout={Layout.duration(500).easing(Easing.bezierFn(0.25, 1, 0.5, 1))}>
      <Pressable onPress={onPress} style={[style.viewBox, ctStyle]}>
        <Text style={style.text}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

type dataType = {
  id: number;
  name: string;
  style?: StyleProp<ViewStyle>;
};

const KeyframeAnimation = () => {
  const [data, setData] = React.useState<dataType[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);

  const RandomNum = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const addData = () => {
    const rdH = RandomNum(WINDOW_HEIGHT / 8, WINDOW_HEIGHT / 4);
    const randomR = RandomNum(0, 255);
    const randomG = RandomNum(0, 255);
    const randomB = RandomNum(0, 255);
    setData(data => [
      ...data,
      {
        id: Date.now(),
        name: `Slot ${data.length}`,
        style: {
          width: (WINDOW_WIDTH * 0.9) / 3,
          height: rdH,
          backgroundColor: `rgb(${randomR},${randomG},${randomB})`,
        },
      },
    ]);
    if (data.length > 8) scrollRef.current?.scrollToEnd();
  };

  const removeData = (id: number) => {
    setData(data => data.filter(item => item.id != id));
  };

  const removeDataAll = () => {
    setData([]);
  };

  const addMoreData = () => {
    for (let i = 0; i < 9; i++) {
      addData();
    }
  };

  return (
    <View style={style.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          style.layoutView,
          data.length < 9
            ? {
                flex: 1,
              }
            : {
                paddingBottom: WINDOW_HEIGHT / 4,
              },
        ]}>
        {data.map(item => {
          return (
            <ListRow
              key={item.id + item.name}
              item={item.name}
              onPress={() => removeData(item.id)}
              ctStyle={item.style}
            />
          );
        })}
      </ScrollView>

      <View style={style.nav}>
        <View style={style.buttongroup}>
          <MyButton
            btStyle={style.button}
            text="Add"
            onPress={() => {
              addData();
            }}
            onLongPress={() => {
              addMoreData();
            }}
            delayLongPress={300}
          />
          <MyButton
            btStyle={style.button}
            text="Remove all"
            onPress={removeDataAll}
          />
        </View>
      </View>
    </View>
  );
};

export default KeyframeAnimation;
