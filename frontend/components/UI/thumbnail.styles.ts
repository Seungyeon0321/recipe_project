import { StyleSheet } from "react-native";

export const ThumbnailStyles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    opacity: 0.7,
  },
  titleContainer: {
    backgroundColor: "#FDBF50",
    paddingVertical: 10,
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontFamily: "raleway-bold",
    fontSize: 20,
  },
  iconContainer: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 150,
  },
  iconRow: {
    flexDirection: "row",
    margin: 10,
  },
  iconFont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "raleway-bold",
    fontSize: 20,
    marginLeft: 10,
    paddingTop: 7,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
    width: 40,
    height: 40,
  },
});
