import React, { useState, useEffect } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { UseSubmitHandler } from "../../components/util/submitHandler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  AppNavigator: undefined;
};

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  const { handleSubmit, isLoading } = UseSubmitHandler();

  // async function loginHandler(credentials: {
  //   email: string;
  //   password: string;
  // }) {
  //   try {
  //     setIsLoading(true);
  //     let response = await Login(credentials);

  //     if (response.data?.status === "success") {
  //       dispatch(setIsAuthenticated(true));
  //     } else {
  //       Alert.alert("Login failed", response.data.message);
  //     }
  //   } catch (error) {
  //     console.info(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  if (isLoading) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return (
    <>
      <AuthContent
        login={true}
        onAuthenticate={(credentials) => handleSubmit(credentials, "login")}
      />
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
