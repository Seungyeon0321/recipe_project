import { useState } from "react";
import Input from "./Input";
import { AuthStyles } from "./styles";
import { TouchableOpacity, Text } from "react-native";

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
}

export default function AuthForm({
  credentialsInvalid,
  onSubmit,
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

      <Input
        placeholder="Confirm Password"
        value={enteredConfirmPassword}
        onUpdateValue={(text) =>
          updateInputValueHandler("confirmPassword", text)
        }
        secureTextEntry
        isInvalid={confirmPasswordIsValid}
      />

      <Input
        placeholder="Username"
        value={enteredUserName}
        onUpdateValue={(text) => updateInputValueHandler("username", text)}
        isInvalid={userNameIsValid}
      />

      <TouchableOpacity style={AuthStyles.createButton} onPress={submitHandler}>
        <Text style={AuthStyles.createText}>Create an account</Text>
      </TouchableOpacity>
    </>
  );
}
