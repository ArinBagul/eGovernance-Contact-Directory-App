import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  getDatabase,
  ref,
  orderByChild,
  onValue,
  off,
} from "firebase/database";
import { app } from "../firebaseConfig";
import Search from "../components/Search";
import ContactCard from "../components/ContactCard";

const DlnoDetails = ({ route }) => {
  const data = route.params;
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);
    const dlnoRef = ref(database, "dlno");

    const fetchDlno = (targetTeam) => {
      onValue(
        dlnoRef,
        (snapshot) => {
          const dlnoData = snapshot.val();
          if (dlnoData) {
            const dlno = [];
            for (const key in dlnoData) {
              if (dlnoData.hasOwnProperty(key)) {
                const item = dlnoData[key];
                if (item.team && item.team.includes(targetTeam)) {
                  dlno.push({
                    id: key,
                    team: item.team,
                    name: item.name,
                    position: item.position,
                    role: item.role,
                    mobileNumber: item.mobileNumber,
                  });
                }
              }
            }
            // console.log(dlno);
            setTeamMembers(dlno);
          }
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    };

    fetchDlno(data.team);
  }, []);

  return (
    <View>
      <Search contentTitle={data.team} />
      <FlatList
        data={teamMembers}
        // renderItem={renderItem}
        style={styles.contactCardList}
        renderItem={({ item }) => <ContactCard data={item} />}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactCardList: {
    marginBottom: 150,
    // backgroundColor: 'red'
  },
});

export default DlnoDetails;
