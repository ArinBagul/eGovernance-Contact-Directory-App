import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebaseConfig";
import Colours from '../constants/Colours';
import Search from "../components/Search";
import { FocusAwareStatusBar } from "../App";

interface Team {
  id: string;
  team: string;
  priority: string;
}

const Dlno: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const database = getDatabase(app);
    const teamsRef = ref(database, "team");

    const fetchTeams = () => {
      onValue(
        teamsRef,
        (snapshot) => {
          const teamsData = snapshot.val();
          if (teamsData) {
            const teamsArray = Object.keys(teamsData).map((key) => ({
              id: key,
              team: teamsData[key].team,
              priority: teamsData[key].priority,
            }));
            teamsArray.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
            setTeams(teamsArray);
          }
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    };

    fetchTeams();

    return () => {
      off(teamsRef);
    };
  }, []);

  const handleOnPress = useCallback((data: Team) => {
    navigation.navigate("DlnoDetails", data);
  }, [navigation]);

  const DlnoList: React.FC<{ data: Team }> = ({ data }) => (
    <TouchableOpacity onPress={() => handleOnPress(data)}>
      <LinearGradient
        colors={["#007EC5", "#002D47", "#002D47"]}
        start={{ x: -0.5, y: 0 }}
        end={{ x: 2, y: 2 }}
        style={styles.listItem}
      >
        <Text style={styles.listItemHeadTxt}>{data.team}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FocusAwareStatusBar backgroundColor={Colours.dark} barStyle="light-content" animated={true} />
      <Search contentTitle="District Level Nodal Officers" />
      <FlatList
        data={teams}
        renderItem={({ item }) => <DlnoList data={item} />}
        keyExtractor={(item) => item.id}
        initialNumToRender={13}
        maxToRenderPerBatch={10}
        windowSize={13}
        removeClippedSubviews={true}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const LoadingSkeleton = () => (
  <View style={styles.loadingContainer}>
    {/* Your loading skeleton components go here */}
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  flatListContainer: {
    marginBottom: 150,
    marginHorizontal: 14,
  },
  listItem: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 20,
    width: "100%",
    marginBottom: 10,
  },
  listItemHeadTxt: {
    color: Colours.light,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dlno;
