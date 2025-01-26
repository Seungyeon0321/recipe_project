import { StyleSheet } from "react-native";

export const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDBF50",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 206,
    height: 121,
    marginBottom: 16,
  },
  logoWithMargin: {
    marginBottom: 60,
  },
  paragraph: {
    margin: 24,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "raleway-bold",
  },
  createButton: {
    width: 274,
    height: 63,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF724C",
  },
  loginButton: {
    width: 203,
    height: 63,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF724C",
  },
  signupButton: {
    width: 203,
    height: 63,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242C41",
  },
  signupText: {
    color: "white",
    fontFamily: "raleway-bold",
    fontSize: 24,
  },
  createText: {
    color: "#242C41",
    fontFamily: "raleway-bold",
    fontSize: 24,
  },
  input: {
    width: 204,
    height: 63,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 22,
    paddingLeft: 13,
    fontSize: 18,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 135,
  },
  clickableText: {
    marginTop: 25,
  },
  goToLoginText: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
  invalid: {
    borderColor: "red",
  },
  forgetText: {
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 25,
  },
});
