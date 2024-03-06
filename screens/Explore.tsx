import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import React from "react";

import Search from "../components/Search";
import Colours from "../constants/Colours";
import Contacts from "./Contacts";

const Explore = () => {
  return (
    <View>
      <StatusBar backgroundColor={Colours.dark} barStyle="light-content" />
      <Search />
      <Contacts />
    </View>
  );
};

export default Explore;
