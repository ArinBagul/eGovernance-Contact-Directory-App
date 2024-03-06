import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colours from "../constants/Colours";
import CustomTabBarIcon from "../constants/Icons";

const Banner = () => {
  return (
    <View style={style.bannerContainer}>
      <Image
        style={style.bannerImg}
        source={require("../assets/Images/banner2.png")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  bannerContainer: {
    alignItems: "center", // Center the image horizontally
  },
  bannerImg: {
    objectFit: "contain",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default Banner;
