import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
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
    color: "#fff"
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
      enable-background="new 32.485 17.5 15.515 17.5"
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
      enable-background="new 32.485 17.5 15.515 17.5"
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

const Item = ({ title, type }) => {
  return (
    <View
      style={[styles.text, type === "human" ? styles.userText : styles.botText]}
    >
      <Text style={styles.textContent}>{title}</Text>
      {type === "human" ? rightTail : leftTail}
    </View>
  );
};

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
        type: "bot"
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
        type: "human"
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam architecto assumenda rem quas eius vel facere cupiditate deserunt explicabo, laborum unde, eveniet placeat libero saepe expedita nemo qui? Ratione, solutaLorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam architecto assumenda rem quas eius vel facere cupiditate deserunt explicabo, laborum unde, eveniet placeat libero saepe expedita nemo qui? Ratione, solutaLorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam architecto assumenda rem quas eius vel facere cupiditate deserunt explicabo, laborum unde, eveniet placeat libero saepe expedita nemo qui? Ratione, soluta",
        type: "bot"
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} type={item.type} />
          )}
          keyExtractor={item => item.id}
          style={{ width: "100%" }}
        />
      </SafeAreaView>
    );
  }
}
