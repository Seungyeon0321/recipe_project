import { StyleSheet } from "react-native";

export const MainStyles = StyleSheet.create({
  rootContainer: {
    margin: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "raleway-bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input_box: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    fontSize: 16,
  },
  image_box: {
    width: 350,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  number_text: {
    fontFamily: "raleway-bold",
    fontSize: 18,
    marginRight: 10,
  },
  ingredient_box: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  ing_input_container: {
    flexDirection: "row",
    flex: 9,
  },
  instruction_box: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  textInput: {
    fontStyle: "italic",
    fontSize: 16,
    paddingLeft: 10,
  },
  button_main_container: {
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  postButton: {
    backgroundColor: "#FF724C",
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "black",
    fontFamily: "raleway-bold",
    fontSize: 16,
  },
});
