import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Signup } from "../../components/util/auth";
import { useState } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  async function signupHandler(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      setIsLoading(true);
      await Signup(credentials);
      setIsLoading(false);
    } catch (error) {
      console.info(error);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}
