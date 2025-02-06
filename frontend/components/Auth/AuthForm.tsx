import React, { useState } from "react";
import Input from "./Input";
import { AuthStyles } from "./styles";
import { TouchableOpacity, Text } from "react-native";
import CustomButton from "../UI/Button";

interface AuthFormProps {
  credentialsInvalid: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    username: boolean;
  };
  onSubmit: (credentials: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }) => void;
  login?: boolean;
}

export default function AuthForm({
  credentialsInvalid,
  onSubmit,
  login,
}: AuthFormProps) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredUserName, setEnteredUserName] = useState("");

  const {
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid,
    username: userNameIsValid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "username":
        setEnteredUserName(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      username: enteredUserName,
    });
  }

  return (
    <>
      <Input
        placeholder="Email"
        value={enteredEmail}
        onUpdateValue={(text) => updateInputValueHandler("email", text)}
        keyboardType="email-address"
        isInvalid={emailIsValid}
      />

      <Input
        placeholder="Password"
        value={enteredPassword}
        onUpdateValue={(text) => updateInputValueHandler("password", text)}
        secureTextEntry
        isInvalid={passwordIsValid}
      />

      {!login && (
        <Input
          placeholder="Confirm Password"
          value={enteredConfirmPassword}
          onUpdateValue={(text) =>
            updateInputValueHandler("confirmPassword", text)
          }
          secureTextEntry
          isInvalid={confirmPasswordIsValid}
        />
      )}

      {!login && (
        <Input
          placeholder="Username"
          value={enteredUserName}
          onUpdateValue={(text) => updateInputValueHandler("username", text)}
          isInvalid={userNameIsValid}
        />
      )}

      {login && (
        <TouchableOpacity>
          <Text style={AuthStyles.forgetText}>forgot your ID/password?</Text>
        </TouchableOpacity>
      )}

      <CustomButton
        buttonStyle={login ? AuthStyles.loginButton : AuthStyles.createButton}
        textStyle={AuthStyles.createText}
        text={login ? "Log in" : "Create an account"}
        onPress={submitHandler}
      />
      {/* 
      <TouchableOpacity
        buttonStyle={login ? AuthStyles.loginButton : AuthStyles.createButton}
        onPress={submitHandler}
      >
        <Text Textstyle={AuthStyles.createText}>
          {login ? "Log in" : "Create an account"}
        </Text>
      </TouchableOpacity> */}
    </>
  );
}
