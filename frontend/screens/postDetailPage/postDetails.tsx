import { View, Text, SafeAreaView, Image } from "react-native";
// import { PostDetailsStyles } from "";
export default function PostDetails({ route }) {
  const { post } = route.params;
  console.log(post);

  return (
    <SafeAreaView>
      <View>
        <View>
          <Image source={{ uri: post.foodImage }} />
        </View>
        <View>
          <Text>{post.foodTitle}</Text>
          <Text>{post.time}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
