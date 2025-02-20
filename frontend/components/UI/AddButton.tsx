import { TouchableOpacity, Image } from "react-native";
import { addButtonStyles } from "./addbutton.style";

export default function AddButton({ onPress }: { onPress: () => void }) {
  const { add_button_container, add_image } = addButtonStyles;

  return (
    <>
      <TouchableOpacity style={add_button_container} onPress={onPress}>
        <Image
          style={add_image}
          source={require("../../assets/images/posting_active.png")}
        />
      </TouchableOpacity>
    </>
  );
}
