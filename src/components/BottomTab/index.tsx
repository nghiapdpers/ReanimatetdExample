import React from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import data from './data';
import TabButton from './TabButton';
import {WINDOW_WIDTH} from '../../global';
import style from './style';
import {AnimatedStyleProp, interpolate} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';

type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;

const BottomTabBar: React.FC<BottomTabBarProps> = ({navigation, state}) => {
  const ref = React.createRef<ICarouselInstance>();
  const TabbarStyle: TAnimationStyle = (value: number) => {
    'worklet';

    const scale = interpolate(
      value,
      [-2, -1, 0, 1, 2],
      [0.5, 0.8, 1.2, 0.8, 0.5],
    );
    const opacity = interpolate(
      value,
      [-2, -1, 0, 1, 2],
      [0.6, 0.8, 1, 0.8, 0.6],
    );
    const translateX = interpolate(
      value,
      [-2, -1, 0, 1, 2],
      [
        -WINDOW_WIDTH / 2.5,
        -WINDOW_WIDTH / 2,
        0,
        WINDOW_WIDTH / 2,
        WINDOW_WIDTH / 2.5,
      ],
    );

    return {
      transform: [{scale}, {translateX}],
      opacity,
    };
  };

  return (
    <Carousel
      ref={ref}
      style={style.tab}
      data={state.routes.map((item, index) => ({
        ...item,
        iconName: data[index].iconName,
      }))}
      renderItem={({item, index}) => {
        return (
          <TabButton
            iconName={item.iconName}
            routeName={item.name}
            isFocused={
              state.index === 4
                ? index === 0 ||
                  index === state.index ||
                  index === state.index - 1
                : state.index === 0
                ? index === 4 ||
                  index === state.index ||
                  index === state.index + 1
                : index === state.index ||
                  index === state.index + 1 ||
                  index === state.index - 1
            }
            onPress={() => {
              ref.current?.scrollTo({
                animated: true,
                index: index,
              });
            }}
          />
        );
      }}
      width={WINDOW_WIDTH / 3}
      height={80}
      onScrollEnd={index => {
        navigation.navigate(state.routes[index].name);
      }}
      customAnimation={TabbarStyle}
      scrollAnimationDuration={600}
      defaultIndex={state.index}
    />
  );
};

export default BottomTabBar;
