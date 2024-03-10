import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Header from "../components/Header";
import Colours from "../constants/Colours";

const Support = () => {
  return (
    <View style={styles.supportContainer}>
      <Header />
      
      <Image style={styles.img} source={require("../assets/Images/support.png")} />

      <Text style={styles.headingTxt}>Are you facing any problem?</Text>
      <Text style={styles.paraTxt}>
        If you need instant support then use chat option to reach us quickly.
        Our support will reply as soon as possible after you send us a message.
      </Text>

      <View style={styles.btnContainer}>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxtB}>Email: <Text style={styles.btnTxt}>support@email.com</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxtB}>Phone: <Text style={styles.btnTxt}>+91 12345 67890</Text></Text>
      </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer:{
    flex: 1,
    // backgroundColor:"green"
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  
  img:{
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  headingTxt:{
    textAlign:"center",
    fontWeight:"bold",
    color: Colours.dark,
    fontSize: 16,
  },
  paraTxt:{
    color: Colours.lighterDark,
    fontSize: 12,
    textAlign:"center",
    marginHorizontal: 30,
    marginVertical: 8,
  },
  txtContainer:{
    alignContent:"center",
    alignItems:"center",
  },
  btnContainer:{
    marginTop: 20,
  },
  btn:{
    alignSelf:"center",
    backgroundColor: "#D9D9D9",
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  btnTxtB:{
    color: Colours.dark,
    fontWeight: "500",
  },
  btnTxt:{
    fontWeight: "normal",
    color: Colours.lighterDark,
  }
})

export default Support;
