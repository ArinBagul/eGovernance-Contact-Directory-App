import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Colours from "../constants/Colours";
import { LinearGradient } from "expo-linear-gradient";


const Card = ({ contentTitle, pc }) => {
  return (
      <LinearGradient
        colors={["#007EC5", "#002D47", "#002D47"]}
        start={{ x: 0.01, y: 0.01 }}
        style={style.card}
      >
        <Text style={style.cardHeadTxt}>{contentTitle}</Text>
        <Text style={style.cardCode}>Code: {pc}</Text>
      </LinearGradient>
  );
};

const style = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 20,
    width: 150,
  },
  cardHeadTxt: {
    color: Colours.light,
    fontSize: 16,
    fontWeight: "bold",
  },
  cardCode: {
    backgroundColor: Colours.light,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignSelf: "flex-end",
    fontSize: 10,
  },
});

export default Card;
