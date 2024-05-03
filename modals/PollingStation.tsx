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
import { FocusAwareStatusBar } from "../App";

const PollingStation = ({ route, navigation }) => {
  const contentTitle = route.params.data; // name of the place "Agar"
  const [ps, setPs] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([])
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

  useEffect(() => {
    setFilteredContacts(ps);
  }, [ps]);

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color={Colours.dark} />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar backgroundColor={Colours.dark} barStyle="light-content" animated={true} />
      <Search contentTitle={`${contentTitle} Polling Stations`} data={ps} setFilteredContacts={setFilteredContacts} />
      <View style={style.placeCardContainer}>

      {filteredContacts.length>0 ? <FlatList 
          data={filteredContacts} 
          renderItem={({ item, index }) => <ListItem data={item} navigation={navigation} key={`${item}_${index}`} />}
          initialNumToRender={12} // Number of items to render initially
          maxToRenderPerBatch={10} // Number of items to render per batch
          windowSize={12} // Number of offscreen items kept in memory
          removeClippedSubviews={true} // Unmount components when they are outside of the viewport
          style={style.flatListContainer}
        /> : <Text style={style.status}>We couldn't find any <Text style={style.boldMsg}>Polling Station(s)</Text> with that name.</Text>}
        
      
        
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
  status:{
    backgroundColor: Colours.lightBlue,
    textAlign: 'center',
    width: 250,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
    fontSize: 14,
    color: Colours.lighterDark,
  },
  boldMsg:{
    color: Colours.lighterDark,
    fontWeight: "bold",
  },
});

export default PollingStation;