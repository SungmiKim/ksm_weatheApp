import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, TouchableHighlight } from "react-native";
import { theme } from "./color";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity activeOpacity={0}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight underlayColor="red" activeOpacity={0} onPress={() => console.log("pressed")}>
          <Text style={styles.btnText}>Trabel</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  headers: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 38,
    fontWeight: 600,
  },
});
