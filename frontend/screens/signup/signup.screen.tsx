import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Signup } from "../../components/util/auth";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../reducer/userSlice";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const navigation = useNavigation();

  async function signupHandler(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      setIsLoading(true);
      await Signup(credentials);
      setIsLoading(false);
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      console.info(error);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  return (
    <>
      <AuthContent onAuthenticate={signupHandler} login={false} />
    </>
  );
}
