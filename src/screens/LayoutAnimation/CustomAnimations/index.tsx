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
  Easing,
  withTiming,
  EntryExitAnimationFunction,
  ExitAnimationsValues,
  EntryAnimationsValues,
  LayoutAnimationsValues,
  LayoutAnimationFunction,
  LayoutAnimation,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import style from './style';
import MyButton from '../../../components/MyButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

interface renderItemType {
  item?: string;
  onPress?: () => void;
  ctStyle?: StyleProp<ViewStyle>;
}

const ListRow = ({item, onPress, ctStyle}: renderItemType) => {
  const CustomExiting: EntryExitAnimationFunction = (
    values: ExitAnimationsValues,
  ): LayoutAnimation => {
    'worklet';
    const myEasing = Easing.out(Easing.exp);
    return {
      initialValues: {
        zIndex: 1,
        height: values.currentHeight,
        opacity: 1,
      },
      animations: {
        opacity: withTiming(0, {duration: 300, easing: myEasing}),
        height: withTiming(0, {duration: 400, easing: myEasing}),
        zIndex: -1,
      },
    };
  };

  const CustomEntering: EntryExitAnimationFunction = (
    values: EntryAnimationsValues,
  ): LayoutAnimation => {
    'worklet';
    const myEasing = Easing.in(Easing.exp);
    return {
      initialValues: {
        zIndex: 1,
        opacity: 0,
        height: 0,
      },
      animations: {
        zIndex: 10,
        height: withTiming(values.targetHeight, {
          duration: 400,
          easing: myEasing,
        }),
        opacity: withTiming(1, {
          duration: 300,
          easing: myEasing,
        }),
      },
    };
  };

  const CustomLayout: LayoutAnimationFunction = (
    values: LayoutAnimationsValues,
  ): LayoutAnimation => {
    'worklet';
    return {
      initialValues: {
        originX: values.currentOriginX,
        originY: values.currentOriginY,
        width: values.currentWidth,
        height: values.currentHeight,
        opacity: 1,
        zIndex: 1,
      },
      animations: {
        originX: withSequence(
          withTiming(values.windowWidth / 2 - values.currentWidth / 2, {
            duration: 500,
          }),
          withTiming(values.targetOriginX, {duration: 500}),
        ),
        originY: withSequence(
          withTiming(
            (WINDOW_HEIGHT * Math.floor(values.targetOriginY / 300)) / 2,
            {
              duration: 500,
            },
          ),
          withDelay(500, withTiming(values.targetOriginY, {duration: 500})),
        ),
        width: withTiming(values.targetWidth),
        height: withSequence(
          withTiming(WINDOW_HEIGHT / 5, {duration: 400}),
          withDelay(600, withTiming(values.targetHeight)),
        ),
        opacity: withSequence(
          withTiming(0.6, {duration: 1000}),
          withTiming(1, {duration: 500}),
        ),
        zIndex: withSequence(
          withTiming(-5, {duration: 1500}),
          withTiming(1, {duration: 100}),
        ),
      },
    };
  };

  return (
    <Animated.View
      entering={CustomEntering}
      exiting={CustomExiting}
      layout={CustomLayout}
      style={[style.viewBox, ctStyle]}>
      <Pressable onPress={onPress}>
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

const CustomAnimation = () => {
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

export default CustomAnimation;
