import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Colours from "../constants/Colours";

import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";
import { FocusAwareStatusBar } from "../App";

const Support = () => {
  const [supportData,setSupportData] = useState([])
  const db = getDatabase();

  const fetchSupportData = async (supportRef) => {
    const snapshot = await get(supportRef);
    const dataSnapshot = snapshot.val();
    const formattedData = [];

    // Convert dataSnapshot to an array
    Object.keys(dataSnapshot).forEach((supportKey) => {
      const supportData = dataSnapshot[supportKey];
      // console.log(supportData.team);
      formattedData.push({
        id: supportKey,
        email: supportData.email,
        phone: supportData.phone,
        supportText: supportData.supportText,
      });
    });

    setSupportData(formattedData)
  };

  useEffect(() => {
    const fetchData = async () => {
      const supportRef = ref(db, "support"); // Assuming 'dlno' is Firebase database node
      
      try {
        fetchSupportData(supportRef);

        // Update state with formatted data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(supportData)
  const handleEmailPress = () => {
    // Linking.openURL(`tel:${number}`)
    Linking.openURL(`mailto:${supportData[0].email}`);
  };
  const handleCallPress = () => {
    // Linking.openURL(`tel:${number}`)
    Linking.openURL(`tel:${supportData[0].phone}`);
  };
  // console.log(supportData);
  
  return (
    <View style={styles.supportContainer}>
      <FocusAwareStatusBar backgroundColor={Colours.light} barStyle="dark-content" animated={true} />
      <Header />
      
      <Image style={styles.img} source={require("../assets/Images/support.png")} />

      <Text style={styles.headingTxt}>Are you facing any problem?</Text>
      <Text style={styles.paraTxt}>
        {supportData.length > 0 ? supportData[0].supportText : ""}
      </Text>

      <View style={styles.btnContainer}>

      <TouchableOpacity style={styles.btn} onPress={handleEmailPress}>
  <Text style={styles.btnTxtB}>Email: <Text style={styles.btnTxt}>{supportData.length > 0 ? supportData[0].email : "support@email.com"}</Text></Text>
</TouchableOpacity>

<TouchableOpacity style={styles.btn} onPress={handleCallPress}>
  <Text style={styles.btnTxtB}>Phone: <Text style={styles.btnTxt}>{supportData.length > 0 ? supportData[0].phone : "9871234506"}</Text></Text>
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
