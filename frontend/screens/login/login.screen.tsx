import React, { useState, useEffect } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Login } from "../../components/util/auth";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // const handleSignUpPress = () => {
  //   navigation.navigate("Signup");
  // };
  // useEffect(() => {
  //   if (response) {
  //     navigation.navigate("AppNavigator");
  //   }
  // }, [response]);

  async function loginHandler(credentials: {
    email: string;
    password: string;
  }) {
    try {
      setIsLoading(true);
      let response = await Login(credentials);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.info(error);
    }
  }

  return (
    <>
      <AuthContent login={true} onAuthenticate={loginHandler} />
    </>
  );
}
//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={require("../../assets/images/greeting/logo.png")}
//         style={styles.logo}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="ID"
//         value={userId}
//         onChangeText={(text) => setUserId(text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="PW"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//       />

//       <TouchableOpacity>
//         <Text style={styles.forgetText}>forgot your ID/password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginButton} onPress={handleProceed}>
//         <Text style={styles.loginText}>Log in</Text>
//       </TouchableOpacity>

//       <Text style={styles.paragraph}>OR</Text>

//

//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FDBF50",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 206,
//     height: 121,
//     marginBottom: 16,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 20,
//     textAlign: "center",
//     fontFamily: "raleway-bold",
//   },
//   input: {
//     width: 204,
//     height: 63,
//     borderColor: "#000",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 22,
//     paddingLeft: 13,
//     fontSize: 24,
//   },
//   loginButton: {
//     marginTop: 58,
//     width: 204,
//     height: 63,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FF724C",
//   },
//   signupButton: {
//     width: 204,
//     height: 63,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#242C41",
//   },
//   loginText: {
//     color: "#242C41",
//     fontFamily: "raleway-bold",
//     fontSize: 24,
//   },
//   signupText: {
//     color: "white",
//     fontFamily: "raleway-bold",
//     fontSize: 24,
//   },
//   forgetText: {
//     fontSize: 16,
//     textDecorationLine: "underline",
//   },
// });
