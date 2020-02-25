import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Navbar extends Component {
  render() {
    const styles = StyleSheet.create({
      navBarContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "space-around",
        height: 80,
        maxHeight: 90,
        width: "100%",
        borderWidth: 1,
        borderColor: "#282828",
        flexDirection: "row",
        paddingBottom: 5,
        paddingLeft: 5,
        backgroundColor: "red"
      },
      navBarText: {
        flex: 1,
        margin: 5,
        fontSize: 25,
        color: "#fff"
      },
      navBarLogo: {
        height: 40,
        maxHeight: 40,
        maxWidth: 40,
        width: 40,
        margin: 5
      }
    });

    return (
      <View style={styles.navBarContainer}>
        <Text style={styles.navBarText}>SortItOut</Text>
        <Image
          source={require("../assets/logo.png")}
          style={styles.navBarLogo}
        />
      </View>
    );
  }
}
