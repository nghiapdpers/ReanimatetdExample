import React from 'react';
import {FlatList, View, Text, ScrollView, Pressable} from 'react-native';
import Animated, {
  ComplexAnimationBuilder,
  Layout,
} from 'react-native-reanimated';
import style from './style';
import MyButton from '../../../components/MyButton';
import Data from './data';
import {WINDOW_HEIGHT} from '../../../global';

interface renderItemType {
  item: string;
  onPress: () => void;
  enterType: ComplexAnimationBuilder | any;
  exitType: ComplexAnimationBuilder | any;
}

const ListRow = ({
  item,
  onPress,
  enterType,
  exitType,
}: renderItemType): React.ReactElement => {
  return (
    <Animated.View
      entering={enterType}
      exiting={exitType}
      layout={Layout.delay(300)}>
      <Pressable onPress={onPress} style={style.textView}>
        <Text style={style.text}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

type buttonRenderItemType = {
  item: {
    name: string;
    enter: ComplexAnimationBuilder | any;
    exit: ComplexAnimationBuilder | any;
  };
};

type dataType = {
  id: number;
  name: string;
};

const Exitting = () => {
  const [data, setData] = React.useState<dataType[]>([]);
  const [exitType, setExitType] = React.useState<ComplexAnimationBuilder>();
  const [enterType, setEnterType] = React.useState<ComplexAnimationBuilder>();
  const scrollRef = React.useRef<ScrollView>(null);

  const _buttonRenderItem: React.FC<buttonRenderItemType> = ({item}) => {
    return (
      <MyButton
        text={item.name}
        btStyle={style.renderButton}
        onPress={() => {
          setExitType(item.exit);
          setEnterType(item.enter);
        }}
      />
    );
  };

  const addData = () => {
    setData(data => [
      ...data,
      {id: Date.now(), name: `Empty Slot ${data.length}`},
    ]);
  };

  const removeData = (id: number) => {
    setData(data => data.filter(item => item.id != id));
  };

  const removeDataAll = () => {
    setData([]);
  };

  return (
    <View style={style.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          scrollRef.current?.scrollToEnd();
        }}
        contentContainerStyle={{paddingBottom: WINDOW_HEIGHT * 0.09}}>
        {data.map(item => (
          <ListRow
            key={item.id}
            item={item.name}
            enterType={enterType}
            exitType={exitType}
            onPress={() => removeData(item.id)}
          />
        ))}
      </ScrollView>

      {/* <FlatList
        style={[{width: '100%'}]}
        contentContainerStyle={{paddingBottom: WINDOW_HEIGHT * 0.1}}
        data={data}
        renderItem={({item}) => (
          <ListRow
            key={item}
            item={item}
            enterType={enterType}
            exitType={exitType}
            onPress={() => removeData(item)}
          />
        )}
      /> */}

      <View style={style.nav}>
        <View style={style.buttongroup}>
          <MyButton
            btStyle={style.button}
            text="Add"
            onPress={() => {
              addData();
            }}
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

export default Exitting;
