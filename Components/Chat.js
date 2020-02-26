import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <Text>This is the chat UI</Text>
      </View>
    );
  }
}
