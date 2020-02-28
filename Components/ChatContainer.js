import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import Chat from "./Chat";
const axios = require("axios").default;

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isInputFocused: false,
      userInput: [],
      image: "../assets/logo.png",
      location: null,
      toggleMoreIcons: false,
      messages: []
    };
    this.addUserInputRef = React.createRef();

    this.imageStructure = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      base64: true,
      exif: false
    };
  }

  getCameraRollImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync(this.imageStructure);

    if (!result.cancelled) {
      this.setState({ image: result }, () => {
        this.postImage(this.state.image.base64);
      });
    }
  };

  getCameraImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync(this.imageStructure);

    if (!result.cancelled) {
      this.setState({ image: result }, () => {
        this.postImage(this.state.image.base64);
      });
    }
  };

  getLocation = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    if (!location.cancelled) {
      this.setState({ location });
    }
  };

  postImage = image => {
    const imageData = "data:image/jpeg;base64," + image;

    axios
      .post("https://e22a768c.ngrok.io/services/create-image-url", {
        file: imageData
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const { text } = this.state;
    if (text) {
      this.setState(
        {
          userInput: this.state.text,
          messages: [
            {
              id: Math.random()
                .toString(36)
                .replace("0.", "bd7acbea-c1b1-46c2-aed5" || ""),
              title: this.state.text,
              type: "human"
            }
          ]
        },
        () => {
          this.setState({
            text: ""
          });
        }
      );
    }
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
    let { toggleMoreIcons, image, messages } = this.state;

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
        alignItems: "flex-end",
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
      chatTextContainerImage: {
        width: "100%",
        flex: 3,
        height: 130,
        paddingTop: 7
      },
      chatTextInput: {
        color: "#fff",
        flex: 3,
        paddingLeft: 15,
        backgroundColor: "rgba(55, 57, 64, 0.85)",
        borderRadius: 25,
        maxHeight: 50
      },
      chatTextIcon: {
        flex: 1
      }
    });

    const chatView = (
      <Chat style={styles.chatContentContainer} messages={messages} />
    );

    const ctaIcons = !toggleMoreIcons ? (
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
    );

    const inputContent = (
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
          onPress={this.addUserInput}
          size={30}
          style={styles.chatTextIcon}
        />
      </>
    );
    const inputField = image ? (
      <>
        <View style={{ height: 100, padding: "2%" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            height: 60,
            borderWidth: 1,
            borderColor: "#fff"
          }}
        >
          {inputContent}
        </View>
      </>
    ) : (
      { inputContent }
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
          <View
            style={
              image ? styles.chatTextContainerImage : styles.chatTextContainer
            }
          >
            {inputField}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
