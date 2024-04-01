import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomTabBarIcon from "../constants/Icons";
import Colours from "../constants/Colours";
import { LinearGradient } from "expo-linear-gradient";

const Officers = ({navigation}) => {

  const handleDLNOPress = () => {
    navigation.navigate("Dlno",navigation)
  }

  return (
    <View style={style.officersContainer}>
      <View style={style.OfficerSectionHeading}>
        <Text style={style.OfficerSectionHeadingTxt}>
          Explore by <Text style={{ fontWeight: "bold" }}>Officers</Text>
        </Text>
        <CustomTabBarIcon
          icon={`<svg xmlns="http://www.w3.org/2000/svg" width="23" height="8" viewBox="0 0 23 8" fill="none">
                <path d="M0.5 3.29999C0.223858 3.29999 2.41411e-08 3.52385 0 3.79999C-2.41411e-08 4.07613 0.223858 4.29999 0.5 4.29999L0.5 3.29999ZM22.8536 4.15354C23.0488 3.95828 23.0488 3.6417 22.8536 3.44644L19.6716 0.264456C19.4763 0.0691934 19.1597 0.0691933 18.9645 0.264456C18.7692 0.459718 18.7692 0.7763 18.9645 0.971562L21.7929 3.79999L18.9645 6.62842C18.7692 6.82368 18.7692 7.14026 18.9645 7.33552C19.1597 7.53079 19.4763 7.53079 19.6716 7.33552L22.8536 4.15354ZM0.5 4.29999L22.5 4.29999L22.5 3.29999L0.5 3.29999L0.5 4.29999Z" fill="#005788"/>
                </svg>`}
          size={30}
          color={Colours.blueForDark}
        />
      </View>

      <View style={style.officersCardContainer}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FFFBA4", "#CCB15A", "#B28A33"]}
            start={{x:0.01,y:0.01}}
            style={style.card}>
            <Text style={[style.cardHeadTxt, {color: "#463200"}]}>Important Officers</Text>
            <Text style={[style.cardCode, {backgroundColor: "#463200", color:Colours.light}]}>IMP DLNO</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleDLNOPress}>
          <LinearGradient
            colors={["#CECECE", "#DCDCDC", "#F2F2F2"]}
            start={{x:0.01,y:0.01}}
            style={style.card}>
            <Text style={style.cardHeadTxt}>District Level Nodal Officers</Text>
            <Text style={[style.cardCode, {backgroundColor: Colours.dark, color:Colours.light}]}>Teams</Text>
          </LinearGradient>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  officersContainer: {},
  OfficerSectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  OfficerSectionHeadingTxt: {
    fontSize: 16,
    color: Colours.lighterDark,
  },
  officersCardContainer: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    // alignSelf: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 20,
    width: 150,
  },
  cardHeadTxt: {
    color: Colours.dark,
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

export default Officers;
