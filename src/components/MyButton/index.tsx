import {
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import style from './style';

type ButtonProps = {
  text: string;
  btStyle?: StyleProp<ViewStyle>;
};

const MyButton: React.FC<ButtonProps & PressableProps> = props => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        style.container,
        props.btStyle,
        pressed ? {opacity: 0.6} : null,
      ]}>
      <Text style={style.text}>{props.text}</Text>
    </Pressable>
  );
};

export default MyButton;
