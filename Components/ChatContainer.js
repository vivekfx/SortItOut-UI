import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isInputFocused: false,
      userInput: [],
      image: null,
      location: null,
      toggleMoreIcons: false
    };
    this.addUserInputRef = React.createRef();

    this.imageStructure = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true
    };
  }

  getCameraRollImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync(this.imageStructure);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getCameraImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync(this.imageStructure);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getLocation = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    if (!location.cancelled) {
      this.setState({ location });
    }
  };

  setInputFocus = () => {
    this.setState(prevState => ({
      isInputFocused: !prevState.isInputFocused
    }));
  };

  setInputValue = text => {
    this.setState({
      text
    });
  };

  addUserInput = () => {
    this.setState(
      {
        userInput: this.state.text
      },
      () => {
        this.props.addinput(this.state.text);
        this.setState({
          text: ""
        });
      }
    );
  };

  showMoreIcons = () => {
    this.setState({
      toggleMoreIcons: true
    });
  };

  hideMoreIcons = () => {
    this.setState({
      toggleMoreIcons: false
    });
  };

  render() {
    let { toggleMoreIcons } = this.state;

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
        flex: 3,
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)"
      },
      chatInputContainerWrapper: {
        minHeight: 50,
        marginBottom: 20
      },
      chatInputContainerWrapperFocused: {
        marginBottom: 5
      },
      chatInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        width: "100%",
        minHeight: 50,
        borderRadius: 5,
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      chatIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        paddingLeft: 5
      },
      chatIconContainerOpen: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 5
      },
      chatTextContainer: {
        position: "relative",
        flexDirection: "row",
        width: "100%",
        flex: 3,
        height: 50,
        paddingTop: 7
      },
      chatTextInput: {
        color: "#fff",
        flex: 3,
        paddingLeft: 15,
        backgroundColor: "rgba(55, 57, 64, 0.85)",
        borderRadius: 25
      },
      chatTextIcon: {
        color: "#fff",
        flex: 1,
        marginTop: -2
      }
    });

    const chatView = (
      <ScrollView style={styles.chatContentContainer}>
        <Text>This is the chat container</Text>
      </ScrollView>
    );

    const ctaIcons = (
      <>
        {!toggleMoreIcons ? (
          <FontAwesome.Button
            name="plus-circle"
            backgroundColor="#282828"
            onPress={this.showMoreIcons}
            size={30}
          />
        ) : (
          <>
            <FontAwesome.Button
              name="file-image-o"
              backgroundColor="#282828"
              onPress={this.getCameraRollImage}
              size={30}
            />
            <FontAwesome.Button
              name="camera"
              backgroundColor="#282828"
              onPress={this.getCameraImage}
              size={30}
            />
          </>
        )}
      </>
    );

    const inputField = (
      <>
        <TextInput
          style={[styles.chatTextInput]}
          placeholder="Input text here!"
          placeholderTextColor="#fff"
          onChangeText={this.setInputValue}
          value={this.state.text}
          onFocus={() => {
            this.setInputFocus();
            this.hideMoreIcons();
          }}
          onBlur={this.setInputFocus}
        />

        <FontAwesome.Button
          name="paper-plane"
          backgroundColor="#282828"
          onPress={this.getCameraImage}
          size={30}
          style={styles.chatTextIcon}
        />
      </>
    );

    const isInputFocused = this.state.isInputFocused
      ? [styles.chatInputContainer, styles.chatInputContainerWrapperFocused]
      : [styles.chatInputContainer, styles.chatInputContainerWrapper];

    const toggleCtaIcons = toggleMoreIcons
      ? styles.chatIconContainerOpen
      : styles.chatIconContainer;

    return (
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior="padding"
        enabled
      >
        {chatView}

        <View style={isInputFocused}>
          <View style={toggleCtaIcons}>{ctaIcons}</View>
          <View style={styles.chatTextContainer}>{inputField}</View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
