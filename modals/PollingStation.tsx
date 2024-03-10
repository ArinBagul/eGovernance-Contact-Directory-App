import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator ,
} from "react-native";
import React, { useEffect, useState } from "react";

import Search from "../components/Search";
import Card from "../components/Card";
import Colours from "../constants/Colours";
import ListItem from "../components/ListItem";
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../firebaseConfig";
import BottomNavigation from "../BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";

const PollingStation = ({ route, navigation }) => {
  const contentTitle = route.params.data; // name of the place "Agar"

  const [ps, setPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase(), `ps/${contentTitle}`); // Assuming "Agar" is the location node

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const psArray = Object.values(data).map((item) => item);
        setPs(psArray);
        setLoading(false); // Data is fetched, set loading to false
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colours.dark} />
      </View>
    );
  }

  
  // console.log(boothNames)

  return (
    <View>
      <Search contentTitle={`${contentTitle} Polling Stations`} />
      <View style={style.placeCardContainer}>
        
      <FlatList 
          data={ps} 
          renderItem={({ item, index }) => <ListItem data={item} navigation={navigation} key={`${item}_${index}`} />}
          initialNumToRender={12} // Number of items to render initially
          maxToRenderPerBatch={10} // Number of items to render per batch
          windowSize={12} // Number of offscreen items kept in memory
          removeClippedSubviews={true} // Unmount components when they are outside of the viewport
          style={style.flatListContainer}
        />
        
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeCardContainer: {
    flexDirection: "column",
    gap: 10,
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // alignSelf: "center",
    paddingHorizontal: 15,
  },
  flatListContainer:{
    marginBottom: 290,
  },
});

export default PollingStation;
