import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isInputFocused: false
    };
  }

  setInputFocus = () => {
    this.setState(prevState => ({
      isInputFocused: !prevState.isInputFocused
    }));
  };

  render() {
    const styles = StyleSheet.create({
      chatContainer: {
        backgroundColor: "#282828",
        width: "100%",
        height: "80%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 2
      },
      chatContentContainer: {
        width: "100%",
        height: "100%",
        flex: 3,
        backgroundColor: "#fff",
        borderRadius: 5
      },
      chatInputContainerWrapper: {
        minHeight: 50,
        marginBottom: 20
      },
      chatInputContainerWrapperFocused: {
        minHeight: 50,
        marginBottom: 0
      },
      chatInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        width: "100%",
        minHeight: 50,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      chatIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      chatTextContainer: {
        position: "relative",
        width: "100%",
        flex: 3,
        height: 50
      },
      chatTextInput: {
        minHeight: 50,
        color: "#fff"
      },
      chatTextIcon: {
        position: "absolute",
        right: 10,
        top: "30%",
        color: "#fff"
      }
    });

    return (
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior="padding"
        enabled
      >
        <ScrollView style={styles.chatContentContainer}>
          <View>
            {/* map chat data here */}
            <Text>
              {this.state.text ? this.state.text : "This is the chat container"}
            </Text>
          </View>
        </ScrollView>

        <View
          style={
            this.state.isInputFocused
              ? styles.chatInputContainerWrapperFocused
              : styles.chatInputContainerWrapper
          }
        >
          <View style={styles.chatInputContainer}>
            <View style={styles.chatIconContainer}>
              <FontAwesomeIcon
                icon="file-upload"
                style={{
                  position: "absolute",
                  top: "30%",
                  color: "#fff"
                }}
              />
            </View>
            <View style={styles.chatTextContainer}>
              <TextInput
                style={styles.chatTextInput}
                placeholder="Input text here!"
                placeholderTextColor="#fff"
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                onFocus={this.setInputFocus}
                onBlur={this.setInputFocus}
              />
              <FontAwesomeIcon
                icon="paper-plane"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "30%",
                  color: "#fff"
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
