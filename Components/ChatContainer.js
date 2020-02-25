import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    const styles = StyleSheet.create({
      chatContainer: {
        flex: 3,
        backgroundColor: "#fff",
        width: "100%",
        borderWidth: 1,
        height: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
      },
      chatContent: {
        borderWidth: 1,
        width: "100%",
        height: "100%",
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
      },
      chatInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
      },
      chatInput: {
        height: 40,
        flex: 2,
        borderWidth: 1
      }
    });

    return (
      <View style={styles.chatContainer}>
        <Text style={styles.chatContent}>
          {this.state.text ? this.state.text : "This is the chat container"}
        </Text>
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Type here to translate!"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}
