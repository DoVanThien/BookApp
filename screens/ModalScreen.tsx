import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { SIZES } from "../constants";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <Text style={styles.title}>Info</Text>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
