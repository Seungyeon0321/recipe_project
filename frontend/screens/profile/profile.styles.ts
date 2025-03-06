import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "50%",
    paddingTop: 100,
  },
  profileText: {
    fontSize: 30,
  },
  imageContainer: {
    borderRadius: 100,
    marginTop: 20,
    width: 180,
    height: 180,
    backgroundColor: "gray",
  },
  optionContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  box_style: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
  },
  box_style_text: {
    color: "white",
    fontSize: 25,
    fontFamily: "raleway",
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginRight: 40,
  },
});
