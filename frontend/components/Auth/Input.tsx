import { TextInput, KeyboardTypeOptions } from "react-native";
import { AuthStyles } from "./styles";

export default function Input({
  isInvalid,
  placeholder,
  value,
  onUpdateValue,
  keyboardType,
  secureTextEntry,
}: {
  isInvalid: boolean;
  placeholder: string;
  value: string;
  onUpdateValue: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      style={[AuthStyles.input, isInvalid && AuthStyles.invalid]}
      placeholder={placeholder}
      value={value}
      onChangeText={onUpdateValue}
      keyboardType={keyboardType}
    />
  );
}
