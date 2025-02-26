import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { MainStyles } from "./posting.styles";
import AddButton from "../UI/AddButton";

export default function AddInstructions({ instructions, setInstructions }) {
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
      {instructions.map((v) => (
        <View style={instruction_box} key={v.id}>
          <Text style={number_text}>{v.id}</Text>
          <TextInput
            style={input_box}
            value={v.instruction}
            placeholder="Add your instructions here..."
            onChangeText={(text) => handleInstructionChange(v.id, text)}
          />
        </View>
      ))}
      <AddButton onPress={addInstruction} />
    </>
  );
}
