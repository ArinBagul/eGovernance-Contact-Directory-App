import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Search from "../components/Search";
import { getDatabase, ref, onValue, off } from "firebase/database";
import ContactCard from "../components/ContactCard";
import { app } from "../firebaseConfig";
import { FocusAwareStatusBar } from "../App";
import Colours from "../constants/Colours";

const Impo = () => {
  const [impo, setImpo] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);
    const impoRef = ref(database, `impo`);

    const fetchAco = () => {
      onValue(
        impoRef,
        (snapshot) => {
          const impoData = snapshot.val();
          if (impoData) {
            // Convert object to array of PSO entries
            const impoArray = Object.keys(impoData).map((key) => ({
              id: key,
              name: impoData[key].name,
              position: impoData[key].designation,
              mobileNumber: impoData[key].mobileNumber,
              role: "IMP-DLNO",
            }));
            setImpo(impoArray);
            setLoading(false);
          } else {
            setLoading(false);
          }
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    };

    fetchAco();

    return () => {
      off(impoRef);
    };
  }, []);

  useEffect(() => {
    setFilteredContacts(impo);
  }, [impo]);

  // console.log(filteredContacts)

  if (loading) {
    return <Text style={{flex:1,textAlign:'center', textAlignVertical: 'center'}}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FocusAwareStatusBar backgroundColor={Colours.dark} barStyle="light-content" animated={true} />
      <Search contentTitle={`Important DLNO`} data={impo} setFilteredContacts={setFilteredContacts} />
      {filteredContacts.length === 0 ? (
        <Text>No data found</Text>
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => <ContactCard data={item} />}
          keyExtractor={(item, index) => index.toString()} // Use index as the key
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default Impo;
