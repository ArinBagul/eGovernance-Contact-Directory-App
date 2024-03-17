import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import React from "react";
import ContactCard from "../components/ContactCard";

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const tabBarHeight = 170; // Adjust this value based on your bottom tab bar's height

const scrollViewHeight = windowHeight - tabBarHeight;


const Contacts = () => {
  return (
    <View>
      <Text>Waiting for data</Text>
    </View>
  );
};

const style = StyleSheet.create({
  contactCardsContainer: {
    gap: 10,
    height: scrollViewHeight,
    // backgroundColor: "red",
  },
});

export default Contacts;
