import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./Components/Navbar";
import ChatContainer from "./Components/ChatContainer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faFileUpload, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faFileUpload, faPaperPlane);

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
