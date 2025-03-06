import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { MainStyles } from "./posting.styles";
import CustomButton from "../../components/UI/Button";
import Add_ingrediences from "../../components/Posting/Add_ingrediences";
import Add_instructions from "../../components/Posting/Add_instructions";
import { useNavigation } from "@react-navigation/native";
import { createPost } from "../../reducer/postSlice";
import { RootState, AppDispatch } from "../../store/store";

type ProfileNavigationProp = {
  navigate: (screen: string) => void;
};

export function PostingScreen() {
  const token = useSelector((state: RootState) => state.user.token);

  const success_post = useSelector(
    (state: RootState) => state.post.success_post
  );
  console.log("success_post", success_post);

  const [foodTitle, setFoodTitle] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [instructions, setInstructions] = useState([
    { id: 1, instruction: "" },
  ]);
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", unit: "" },
  ]);

  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    rootContainer,
    title,
    input_box,
    image_box,
    button_main_container,
    button_container,
    success_post_main_container,
    success_post_image,
    back_to_home_button_container,
    see_my_posts_button_container,
    success_post_container,
    success_post_text,
    back_to_home_button_text,
    see_my_posts_button_text,
  } = MainStyles;

  const submitHandler = async () => {
    foodTitle.trim();
    foodImage.trim();

    let foodTitleIsValid = foodTitle.length > 0;
    // let foodImageIsValid = foodImage.length > 0;
    let instructionsIsValid = instructions.length > 0;
    let ingredientsIsValid = ingredients.length > 0;

    if (!foodTitleIsValid || !instructionsIsValid || !ingredientsIsValid) {
      return Alert.alert(
        `Please fill ${!foodTitleIsValid ? "title" : ""} ${
          !instructionsIsValid ? "instructions" : ""
        } ${!ingredientsIsValid ? "ingredients" : ""}`
      );
    }

    console.log("token", token);

    //이렇게 하지 않으면 non-serializable error가 발생함
    let postData = {
      foodTitle,
      foodImage,
      instructions,
      ingredients,
      token,
    };

    const resultAction = await dispatch(createPost(postData));
    console.log("resultAction", resultAction);

    if (createPost.fulfilled.match(resultAction)) {
      Alert.alert("Post created successfully");
      navigation.navigate("Home");
    }
  };

  return (
    // <SafeAreaView style={rootContainer}>
    //   <ScrollView>
    /* {!success_post ? (
          <View>
            <View>
              <Text style={title}>What Do you call it?</Text>
              <View style={{ height: 50 }}>
                <TextInput
                  style={input_box}
                  value={foodTitle}
                  placeholder="type here"
                  onChangeText={(text) => {
                    console.log(text);
                    setFoodTitle(text);
                  }}
                />
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
              <Add_ingrediences
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            </View>

            <View>
              <Add_instructions
                instructions={instructions}
                setInstructions={setInstructions}
              />
            </View>

            <View style={button_main_container}>
              <View style={button_container}>
                <CustomButton
                  buttonStyle={MainStyles.postButton}
                  textStyle={MainStyles.buttonText}
                  text="Post"
                  onPress={submitHandler}
                />

                <CustomButton
                  buttonStyle={MainStyles.postButton}
                  textStyle={MainStyles.buttonText}
                  text="Cancel"
                  onPress={() => {
                    console.log("cancel");
                    navigation.navigate("Home");
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text>Thank you for your sharing!</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/food3.png")}
                style={image_box}
              />
            </View>
            <View>
              <TouchableOpacity style={back_to_home_button_container}>
                <Text>Back to Home</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={see_my_posts_button_container}>
                <Text>See my posts</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */
    /* </ScrollView>
    </SafeAreaView> */
    <SafeAreaView style={success_post_main_container}>
      <View style={success_post_container}>
        <View>
          <Text style={success_post_text}>Thank you for your sharing!</Text>
        </View>
        <View>
          <Image
            source={require("../../assets/images/food3.png")}
            style={success_post_image}
          />
        </View>
        <View>
          <TouchableOpacity style={back_to_home_button_container}>
            <Text style={back_to_home_button_text}>Back to Home</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={see_my_posts_button_container}>
            <Text style={see_my_posts_button_text}>See my posts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
