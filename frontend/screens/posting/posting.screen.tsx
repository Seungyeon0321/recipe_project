import React, { useState } from "react";
import { Text, View, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "./posting.styles";
import CustomButton from "../../components/UI/Button";
import Add_ingrediences from "../../components/Posting/Add_ingrediences";
import Add_instructions from "../../components/Posting/Add_instructions";

export function PostingScreen() {
  const {
    rootContainer,
    title,
    input_box,
    image_box,
    ingredient_box,
    number_text,
    instruction_box,
    ing_input_container,
    add_ing_container,
    add_image,
    button_main_container,
    button_container,
    postButton,
  } = MainStyles;

  return (
    <SafeAreaView style={rootContainer}>
      <ScrollView>
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
            <Add_ingrediences />
          </View>

          <View>
            <Add_instructions />
          </View>

          <View style={button_main_container}>
            <View style={button_container}>
              <CustomButton
                buttonStyle={MainStyles.postButton}
                textStyle={MainStyles.buttonText}
                text="Post"
                onPress={() => {}}
              />

              <CustomButton
                buttonStyle={MainStyles.postButton}
                textStyle={MainStyles.buttonText}
                text="Cancel"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
