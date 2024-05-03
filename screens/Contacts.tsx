import { StyleSheet, ScrollView, View, Text, FlatList } from "react-native";
import React from "react";
import ContactCard from "../components/ContactCard";

import { Dimensions } from "react-native";
import Colours from "../constants/Colours";

const windowHeight = Dimensions.get("window").height;
const tabBarHeight = 170; // Adjust this value based on your bottom tab bar's height

const scrollViewHeight = windowHeight - tabBarHeight;

const Contacts = (props) => {
  const contactData = props.data;
  return (
    <View>
      {contactData.length === 0 ? (
        <Text
          style={{
            backgroundColor: Colours.lightBlue,
            textAlign: "center",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 30,
            alignItems: "center",
            alignSelf: "center",
            fontSize: 14,
            color: Colours.lighterDark,
          }}
        >
          Let's{" "}
          <Text style={{ color: Colours.lighterDark, fontWeight: "bold" }}>
            Explore
          </Text>{" "}
          a bit more!
        </Text>
      ) : (
        <FlatList
          data={contactData}
          renderItem={({ item }) => <ContactCard data={item} />}
          keyExtractor={(item, index) => index.toString()} // Use index as the key
          initialNumToRender={10} // Number of items to render initially
          maxToRenderPerBatch={10} // Number of items to render per batch
          windowSize={10} // Number of offscreen items kept in memory
          removeClippedSubviews={true} // Unmount components when they are outside of the viewport
          style={{ marginBottom: 290 }}
        />
      )}
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