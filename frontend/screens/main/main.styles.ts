import { StyleSheet } from "react-native";

export const MainStyles = StyleSheet.create({
  rootContainer: {
    // backgroundColor:'yellow',
    margin: 20,
  },
  search: {
    borderWidth: 3,
    borderColor: "#FF724C",
    borderRadius: 45,
    padding: 5,
    marginTop: 10,
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    width: 30,
    height: 30,
  },
  textInput: {
    fontStyle: "italic",
    fontSize: 16,
    paddingLeft: 10,
  },
});
