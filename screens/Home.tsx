import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import Colours from "../constants/Colours";
import Banner from "../components/Banner";
import Recent from "../components/Recent";
import Places from "../components/Places";
import Officers from "../components/Officers";
import { FocusAwareStatusBar } from "../App";

const Home = ({ navigation }) => {
  return (
    <View>
      <FocusAwareStatusBar
        backgroundColor={Colours.light}
        barStyle="dark-content"
        animated={true}
      />
      <ScrollView>
        <View style={style.appContainer}>
          <Header />
          <Banner />
          <Recent navigation={navigation} />
          <Places navigation={navigation} />
          <Officers navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  appContainer: {
    gap: 20,
    paddingVertical: 20,
  },
});

export default Home;
