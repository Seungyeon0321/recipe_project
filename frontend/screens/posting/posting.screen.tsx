import React from "react";
import { Text, View, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "./posting.styles";
import CustomButton from "../../components/UI/Button";

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
          <Text style={title}>What's the ingredients?</Text>
          <View style={ingredient_box}>
            <Text style={number_text}>1</Text>
            <View style={ing_input_container}>
              <TextInput
                style={[input_box, { flex: 4, marginRight: 10 }]}
                placeholder="type here.."
              />
              <TextInput
                style={[input_box, { flex: 3, marginRight: 10 }]}
                placeholder="amount"
              />
              <TextInput style={[input_box, { flex: 2 }]} placeholder="unit" />
            </View>
          </View>
          <View style={add_ing_container}>
            <Image
              style={add_image}
              source={require("../../assets/images/posting_active.png")}
            />
          </View>
        </View>

        <View>
          <Text style={title}>Now, share your instructions!</Text>
          <View style={instruction_box}>
            <Text style={number_text}>1</Text>
            <TextInput
              style={input_box}
              placeholder="Add your instructions here..."
            />
          </View>
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
    </SafeAreaView>
  );
}
