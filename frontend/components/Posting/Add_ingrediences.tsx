import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { MainStyles } from "./posting.styles";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import AddButton from "../UI/AddButton";

export default function Add_ingrediences() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", unit: "" },
  ]);

  const [selectedUnit, setSelectedUnit] = useState("");

  const data = [
    { key: 1, value: "kg" },
    { key: 2, value: "g" },
    { key: 3, value: "ml" },
    { key: 4, value: "l" },
    { key: 5, value: "pcs" },
    { key: 6, value: "tbsp" },
    { key: 7, value: "tsp" },
    { key: 8, value: "pinch" },
    { key: 9, value: "bag" },
  ];

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length + 1, name: "", amount: "", unit: "" },
    ]);
  };

  const { title, input_box, ingredient_box, number_text, ing_input_container } =
    MainStyles;

  return (
    <>
      <Text style={title}>What's the ingredients?</Text>
      {ingredients.map((ingredient) => (
        <View key={ingredient.id}>
          <View style={ingredient_box}>
            <Text style={number_text}>{ingredient.id}</Text>
            <View style={ing_input_container}>
              <TextInput
                style={[input_box, { flex: 4, marginRight: 10 }]}
                placeholder="type here.."
                value={ingredient.name}
                onChangeText={(text) =>
                  setIngredients(
                    ingredients.map((ing) =>
                      ing.id === ingredient.id ? { ...ing, name: text } : ing
                    )
                  )
                }
              />
              <TextInput
                style={[input_box, { flex: 3, marginRight: 10 }]}
                placeholder="amount"
                value={ingredient.amount}
                onChangeText={(text) =>
                  setIngredients(
                    ingredients.map((ing) =>
                      ing.id === ingredient.id ? { ...ing, amount: text } : ing
                    )
                  )
                }
              />
              {/* need to change it to drop down menu */}
              {/* <TextInput style={[input_box, { flex: 2 }]} placeholder="unit" /> */}
              <SelectList
                boxStyles={{ flex: 2, borderColor: "black" }}
                inputStyles={{
                  color: "black",
                  width: 20,
                  height: 20,
                }}
                setSelected={(val) =>
                  setIngredients(
                    ingredients.map((ing) =>
                      ing.id === ingredient.id ? { ...ing, unit: val } : ing
                    )
                  )
                }
                data={data}
                save="value"
                placeholder="unit"
              />
            </View>
          </View>
          {/*  */}
        </View>
      ))}
      <AddButton onPress={addIngredient} />
    </>
  );
}
