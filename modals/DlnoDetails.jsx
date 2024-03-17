import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, orderByChild, onValue, off } from "firebase/database";
import { app } from "../firebaseConfig";
import Search from '../components/Search';
import ContactCard from '../components/ContactCard';

const DlnoDetails = ({ route }) => {
  const { team } = route.params;
  // console.log(team)
  const [teamMembers, setTeamMembers] = useState([]);
  const database = getDatabase(app);
  const teamMembersRef = ref(database, 'dlno');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamMembersQuery = orderByChild('team');

        onValue(teamMembersRef, (snapshot) => {
          const teamMembersData = snapshot.val();
          if (teamMembersData) {
            const filteredTeamMembers = Object.values(teamMembersData)
              .filter(member => member.team && member.team.includes(team))
              .map(member => ({
                id: member.id,
                name: member.name || '',
                mobileNumber: member.mobileNumber || '',
                office: member.office || '',
                position: member.position || '',
                role: member.role || '',
              }));
            setTeamMembers(filteredTeamMembers);
          }
        });
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();

    // Cleanup function to remove the listener when component unmounts
    return () => {
      off(teamMembersRef);
    };
  }, [team, teamMembersRef]);

  const renderItem = ({ item }) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Mobile Number: {item.mobileNumber}</Text>
      <Text>Office: {item.office}</Text>
      <Text>Position: {item.position}</Text>
      <Text>Role: {item.role}</Text>
    </View>
  );

  return (
    <View>
      <Search contentTitle={team} />
      <FlatList
        data={teamMembers}
        // renderItem={renderItem}
        style={styles.contactCardList}
        renderItem={({ item }) => (
          <ContactCard data={item} />
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactCardList : {
    marginBottom: 150,
    // backgroundColor: 'red'
  }
})

export default DlnoDetails;
