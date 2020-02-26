import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./Components/Navbar";
import ChatContainer from "./Components/ChatContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      <ChatContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
