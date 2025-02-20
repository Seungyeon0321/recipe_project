import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { MainStyles } from "../../screens/posting/posting.styles";
import AddButton from "../UI/AddButton";

export default function AddInstructions() {
  const [instructions, setInstructions] = useState([
    { id: 1, instruction: "" },
  ]);

  const { title, instruction_box, number_text, input_box } = MainStyles;

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { id: instructions.length + 1, instruction: "" },
    ]);
  };

  const handleInstructionChange = (id: number, instruction: string) => {
    setInstructions(
      instructions.map((item) =>
        item.id === id ? { ...item, instruction } : item
      )
    );
  };

  return (
    <>
      <Text style={title}>Now, share your instructions!</Text>
      <View style={instruction_box}>
        <Text style={number_text}>1</Text>
        <TextInput
          style={input_box}
          placeholder="Add your instructions here..."
        />
      </View>

      <AddButton onPress={addInstruction} />
    </>
  );
}
