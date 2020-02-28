import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  text: {
    flexDirection: "row",
    backgroundColor: "#1084ff",
    marginVertical: "5%",
    padding: 10,
    borderRadius: 20,
    flex: 1
  },
  botText: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(55, 57, 64, 0.87)",
    marginHorizontal: "3%"
  },
  userText: {
    alignSelf: "flex-end",
    marginHorizontal: "3%"
  },
  textContent: {
    color: "#fff",
    fontSize: 17
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    zIndex: -1
  },
  arrowLeftContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5)
  },

  arrowRight: {
    right: moderateScale(-6, 0.5)
  }
});

const rightTail = (
  <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
    <Svg
      style={styles.arrowRight}
      width={moderateScale(15.5, 0.6)}
      height={moderateScale(17.5, 0.6)}
      viewBox="32.485 17.5 15.515 17.5"
      enableBackground="new 32.485 17.5 15.515 17.5"
    >
      <Path
        d="M47.5,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
        fill="#1084ff"
        x="0"
        y="0"
      />
    </Svg>
  </View>
);

const leftTail = (
  <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
    <Svg
      style={styles.arrowLeft}
      width={moderateScale(15.5, 0.6)}
      height={moderateScale(17.5, 0.6)}
      viewBox="32.484 17.5 15.515 17.5"
      enableBackground="new 32.485 17.5 15.515 17.5"
    >
      <Path
        d="M38.7,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
        fill="rgba(55, 57, 64, 0.87)"
        x="0"
        y="0"
      />
    </Svg>
  </View>
);

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "Hello and welcome to SortItOut by FX!",
          type: "bot",
          imageUri: ""
        }
      ],
      isTyping: false
    };
  }

  componentDidUpdate(prevProps) {
    const { messages, image } = this.props;

    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: [...this.state.messages, messages[0]]
      });

      if (image) {
        const img = {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b1w",
          title: " image title",
          type: "bot",
          imageUri: image
        };

        this.setState({
          messages: [...this.state.messages, img]
        });
      }
    }
  }

  Item = ({ title, type, imageUri }) => {
    if (this.state.isTyping) {
      setTimeout(() => {
        this.setState({
          isTyping: false
        });
      }, 10000);

      return (
        <View
          style={[
            styles.text,
            type === "human" ? styles.userText : styles.botText
          ]}
        >
          <Animatable.View
            animation="bounce"
            iterationCount="infinite"
            easing="ease-in-out"
            iterationDelay={10}
            style={{
              width: 12,
              height: 12,
              borderWidth: 1,
              borderColor: "rgba(55, 57, 64, 0.87)",
              borderRadius: "50%",
              margin: 2,
              backgroundColor: "grey"
            }}
          />
          <Animatable.View
            animation="bounce"
            iterationCount="infinite"
            easing="ease-in-out"
            iterationDelay={10}
            style={{
              width: 12,
              height: 12,
              borderWidth: 1,
              borderColor: "rgba(55, 57, 64, 0.87)",
              borderRadius: "50%",
              margin: 2,
              backgroundColor: "grey"
            }}
          />
          <Animatable.View
            animation="bounce"
            iterationCount="infinite"
            easing="ease-in-out"
            iterationDelay={10}
            style={{
              width: 12,
              height: 12,
              borderWidth: 1,
              borderColor: "rgba(55, 57, 64, 0.87)",
              borderRadius: "50%",
              margin: 2,
              backgroundColor: "grey"
            }}
          />
          {type === "human" ? rightTail : leftTail}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.text,
          type === "human" ? styles.userText : styles.botText
        ]}
      >
        <Text style={styles.textContent}>{title}</Text>
        {type === "human" ? rightTail : leftTail}
      </View>
    );
  };

  render() {
    const { messages } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <>
              <this.Item
                title={item.title}
                type={item.type}
                imageUri={item.imageUri}
              />
            </>
          )}
          keyExtractor={item => item.id}
          style={{ width: "100%" }}
        />
      </SafeAreaView>
    );
  }
}
