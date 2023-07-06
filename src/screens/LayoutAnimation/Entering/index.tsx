import React from 'react';
import {FlatList, View} from 'react-native';
import Animated, {ComplexAnimationBuilder} from 'react-native-reanimated';
import style from './style';
import MyButton from '../../../components/MyButton';
import EnteringData from './data';

const temp = ['Empty Slot 0'];
type renderItemType = {
  item: string;
};
type buttonRenderItemType = {
  item: {
    name: string;
    type: ComplexAnimationBuilder;
  };
};

const Entering = () => {
  const [data, setData] = React.useState(temp);
  const [enterType, setEnterType] = React.useState<ComplexAnimationBuilder>();
  const flatlistRef = React.useRef<FlatList>(null);

  const _renderItem: React.FC<renderItemType> = ({item}) => {
    return (
      <Animated.Text entering={enterType} style={style.text} children={item} />
    );
  };

  const _buttonRenderItem: React.FC<buttonRenderItemType> = ({item}) => {
    return (
      <MyButton
        text={item.name}
        btStyle={style.renderButton}
        onPress={() => setEnterType(item.type)}
      />
    );
  };

  const addData = () => {
    setData(data => [...data, `Empty Slot ${data.length}`]);
  };

  const removeData = () => {
    setData(data => data.splice(0, data.length - 1));
  };

  const removeDataAll = () => {
    setData([]);
  };

  return (
    <View style={style.container}>
      <FlatList
        ref={flatlistRef}
        style={style.flatlist}
        data={data}
        renderItem={_renderItem}
      />
      <View style={style.buttongroup}>
        <MyButton
          btStyle={style.button}
          text="Add"
          onPress={() => {
            addData();
            if (data.length > 3)
              flatlistRef?.current?.scrollToIndex({
                index: data.length - 1,
                animated: true,
              });
          }}
        />
        <MyButton btStyle={style.button} text="Remove" onPress={removeData} />
        <MyButton
          btStyle={style.button}
          text="Remove all"
          onPress={removeDataAll}
        />
      </View>
      <View style={style.buttonList}>
        <FlatList
          horizontal
          data={EnteringData}
          renderItem={_buttonRenderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Entering;
