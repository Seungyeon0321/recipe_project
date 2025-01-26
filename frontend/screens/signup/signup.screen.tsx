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
      console.log(error);
    }
  }

  const testHandler = async () => {
    try {
      console.log("testHandler");
      const response = await fetch(`http://192.168.62.181:5000/user/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}
