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
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import style from './style';
import MyButton from '../../../components/MyButton';
import Data from './data';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';

interface renderItemType {
  item?: string;
  onPress?: () => void;
  layoutType?: ComplexAnimationBuilder | any;
  ctStyle?: StyleProp<ViewStyle>;
}

const ListRow = ({
  item,
  onPress,
  layoutType,
  ctStyle,
}: renderItemType): React.ReactElement => {
  return (
    <Animated.View
      entering={ZoomIn.duration(300)}
      exiting={ZoomOut.duration(300)}
      layout={layoutType}>
      <Pressable onPress={onPress} style={[style.viewBox, ctStyle]}>
        <Text style={style.text}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

type buttonRenderItemData = {
  item: {
    name: string;
    layout: ComplexAnimationBuilder;
  };
};

type dataType = {
  id: number;
  name: string;
  style?: StyleProp<ViewStyle>;
};

const LayoutTransition = () => {
  const [data, setData] = React.useState<dataType[]>([]);
  const [layout, setLayout] = React.useState<ComplexAnimationBuilder>();
  const scrollRef = React.useRef<ScrollView>(null);

  const _buttonRenderItem: React.FC<buttonRenderItemData> = ({item}) => {
    return (
      <MyButton
        text={item.name}
        btStyle={style.renderButton}
        onPress={() => {
          setLayout(item.layout);
        }}
      />
    );
  };

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
              key={item.id}
              item={item.name}
              layoutType={layout}
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
            onLongPress={() => addMoreData()}
            delayLongPress={300}
          />
          <MyButton
            btStyle={style.button}
            text="Remove all"
            onPress={removeDataAll}
          />
        </View>
        <View style={style.buttonList}>
          <FlatList
            horizontal
            data={Data}
            renderItem={_buttonRenderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default LayoutTransition;
