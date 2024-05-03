import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Banner = () => {
  return (
    <View style={[styles.frameParent, styles.frameParentFlexBox]}>
      <LinearGradient
        style={[styles.maskGroupWrapper, styles.frameParentFlexBox]}
        // locations={[0, 0.6, 1]}
        start={{ x: 0.01, y: 0.01 }}
        colors={["#007ec5", "#002d47", "#002d47"]}
      >
        <Image
          style={styles.maskGroupIcon}
          contentFit="cover"
          source={require("../assets/mask-group.png")}
        />
      </LinearGradient>
      <View style={styles.frameGroup}>
        <View>
          <Text style={styles.welcomeTo}>Welcome to</Text>
          <Text style={styles.electoConnect}>
            <Text style={styles.electo}>Electo</Text>
            <Text style={styles.connect}> Connect</Text>
          </Text>
        </View>
        <Image
          style={styles.akshokStambh1}
          contentFit="cover"
          source={require("../assets/akshok-stambh-1.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  maskGroupIcon: {
    width: 393,
    height: 86,
  },
  maskGroupWrapper: {
    backgroundColor: "transparent",
    zIndex: 0,
  },
  welcomeTo: {
    fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.interRegular,
    color: Color.colorLightblue,
    // textAlign: "center",
  },
  electo: {
    color: Color.colorDeepskyblue,
  },
  connect: {
    color: Color.colorWhitesmoke,
  },
  electoConnect: {
    fontSize: FontSize.size_5xl_5,
    fontWeight: "700",
    // fontFamily: FontFamily.interBold,
    // textAlign: "center",
  },
  akshokStambh1: {
    width: 40,
    height: 68,
    marginLeft: 100,
  },
  frameGroup: {
    // top: 9,
    // left: 34,
    flexDirection: "row",
    zIndex: 1,
    alignItems: "center",
    position: "absolute",
  },
  frameParent: {
    // top: 10,
    // left: 0,
    // position: "absolute",
    // justifyContent: "center",
  },
});

export default Banner;

/*
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
*/