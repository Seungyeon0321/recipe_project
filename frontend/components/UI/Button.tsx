import { TouchableOpacity, Text } from "react-native";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
}

export default function CustomButton(props: ButtonProps) {
  return (
    <TouchableOpacity style={props.buttonStyle} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
}
