import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import Navbar from "./Components/Navbar";
import ChatContainer from "./Components/ChatContainer";
import { SplashScreen } from "expo";
import { Asset } from "expo-asset";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    SplashScreen.preventAutoHide();
  }

  _cacheResourcesAsync = async () => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    const images = [require("./assets/iPhone.png")];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("./assets/animation.gif")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Navbar />
        <ChatContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
