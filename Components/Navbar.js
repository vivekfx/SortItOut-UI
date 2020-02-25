import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Navbar extends Component {
  render() {
    const styles = StyleSheet.create({
      navBarContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        height: 50,
        maxHeight: 100,
        width: "100%"
      },
      navBarText: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        alignItems: "center"
      }
    });

    return (
      <View style={styles.navBarContainer}>
        <Text style={styles.navBarText}>This is the Navbar</Text>
      </View>
    );
  }
}
