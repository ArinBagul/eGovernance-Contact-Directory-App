import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebaseConfig";
import DlnoList from "./DlnoList";

const Dlno = ({ navigation }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const database = getDatabase(app);
    const teamsRef = ref(database, "team");

    const fetchTeams = () => {
      onValue(teamsRef, (snapshot) => {
        const teamsData = snapshot.val();
        if (teamsData) {
          const teamsArray = Object.keys(teamsData).map((key) => ({
            id: key,
            team: teamsData[key].team,
            priority: teamsData[key].priority,
          }));
          teamsArray.sort(
            (a, b) => parseInt(a.priority) - parseInt(b.priority)
          );
          setTeams(teamsArray);
        }
      });
    };

    fetchTeams();

    return () => {
      off(teamsRef);
    };
  }, []);

  return (
    <View>
      <Search contentTitle="District Level Nodal Officers" />
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <DlnoList data={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        initialNumToRender={13}
        maxToRenderPerBatch={10}
        windowSize={13}
        removeClippedSubviews={true}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    // backgroundColor: "red",
    marginBottom: 150,
    marginHorizontal: 14,
  },
});

export default Dlno;
