import React from "react";
import { Text, View, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "./posting.styles";

export function PostingScreen() {
  const {
    rootContainer,
    title,
    input_box,
    image_box,
    ingredient_box,
    instruction_box,
  } = MainStyles;

  return (
    <SafeAreaView style={rootContainer}>
      <View>
        <View>
          <Text style={title}>What Do you call it?</Text>
          <View style={{ height: 50 }}>
            <TextInput style={input_box} placeholder="type here" />
          </View>
        </View>

        <View>
          <Text style={title}>Add an image</Text>
          <Image
            source={require("../../assets/images/food3.png")}
            style={image_box}
          />
        </View>

        <View>
          <Text style={title}>Ingredients</Text>
          <View style={ingredient_box}>
            <Text>1</Text>
            <TextInput style={input_box} placeholder="type here.." />
            <TextInput style={input_box} placeholder="amount" />
            <TextInput style={input_box} placeholder="unit" />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "blue",
            }}
          >
            <Image
              style={{ alignItems: "center", justifyContent: "center" }}
              source={require("../../assets/images/posting_active.png")}
            />
          </View>
        </View>

        <View>
          <Text style={title}>Instructions</Text>
          <View style={instruction_box}>
            <Text>1</Text>
            <TextInput style={input_box} placeholder="type here" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
