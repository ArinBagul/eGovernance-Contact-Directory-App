import {
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import ContactCard from "../components/ContactCard";

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const tabBarHeight = 170; // Adjust this value based on your bottom tab bar's height

const scrollViewHeight = windowHeight - tabBarHeight;


const Contacts = () => {
  return (
    <ScrollView style={style.contactCardsContainer}>
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
    </ScrollView>
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
