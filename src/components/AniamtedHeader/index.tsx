import {ViewStyle} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {HeaderBackButton, HeaderTitle} from '@react-navigation/elements';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';

const AnimatedHeader = React.forwardRef(function (
  props: StackHeaderProps,
  ref,
) {
  const headerStyle: ViewStyle = {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: props.layout.width,
    height: 60,
  };

  const show = useSharedValue(true);

  React.useEffect(() => {
    if (
      typeof props.options.showHeader === 'boolean' &&
      props.options.showHeader
    )
      show.value = true;
    else if (
      typeof props.options.showHeader === 'boolean' &&
      !props.options.showHeader
    )
      show.value = false;
  }, [props.options.showHeader]);

  const headerAnimate = useAnimatedStyle(() => {
    const height = withTiming(show.value ? 60 : 0, {duration: 500});
    return {
      height,
    };
  }, []);

  return (
    <Animated.View style={[headerStyle, headerAnimate]}>
      {show.value ? (
        <>
          <HeaderBackButton onPress={props.navigation.goBack} />
          <HeaderTitle
            style={{textAlignVertical: 'center', marginHorizontal: 10}}>
            {props.route.name}
          </HeaderTitle>
        </>
      ) : null}
    </Animated.View>
  );
});

export default AnimatedHeader;
