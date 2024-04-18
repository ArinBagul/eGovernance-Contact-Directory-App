import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Search from "../components/Search";
import { getDatabase, ref, onValue, off } from "firebase/database";
import ContactCard from "../components/ContactCard";
import { app } from "../firebaseConfig";

const Impo = () => {
  const [impo, setImpo] = useState([]);

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

  if (loading) {
    return <Text style={{flex:1,textAlign:'center', textAlignVertical: 'center'}}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Search contentTitle={`Important DLNO`} />
      {impo.length === 0 ? (
        <Text>No data found</Text>
      ) : (
        <FlatList
          data={impo}
          renderItem={({ item }) => <ContactCard data={item} />}
          keyExtractor={(item, index) => index.toString()} // Use index as the key
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default Impo;
