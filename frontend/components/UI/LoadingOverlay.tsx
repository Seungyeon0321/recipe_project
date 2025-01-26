import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/style";

export default function LoadingOverlay({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 24,
  },
});
