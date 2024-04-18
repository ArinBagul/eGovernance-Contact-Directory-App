import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebaseConfig";

import ContactCard from '../components/ContactCard';

const ContactList = ({route}) => {
  const data = route.params.data;
  // console.log(data)
  const [pso, setPso] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);
    const psoRef = ref(database, `pso/${data.boothName}, ${data.boothAd}`);

    const fetchPso = () => {
      onValue(
        psoRef,
        (snapshot) => {
          const psoData = snapshot.val();
          if (psoData) {
            // Convert object to array of PSO entries
            const psoArray = Object.keys(psoData).map((key) => ({
              id: key,
              name: psoData[key].name,
              role: psoData[key].designation,
              mobileNumber: psoData[key].mobileNumber,
              position: psoData[key].psAddress,
              psName: psoData[key].psName,
            }));
            setPso(psoArray);
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

    fetchPso();

    return () => {
      off(psoRef);
    };
  }, []);

  if (loading) {
    return <Text style={styles.status}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.status}>Error: {error}</Text>;
  }

  return (
    <View>
      <Search contentTitle={`${data.boothName},${data.boothAd}`} />
      {pso.length === 0 ? (
        <Text style={styles.statusND}>No data found</Text>
      ) :  <FlatList
        data={pso}
        renderItem={({ item }) => (
          <ContactCard data={item} />
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        contentContainerStyle={{ paddingBottom: 20 }}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  status:{
    textAlign: 'center',
    // marginTop: 20,
    flex: 1,
    textAlignVertical: 'center'
    // backgroundColor: 'red'
  },
  statusND:{
    textAlign: 'center',
    marginTop: 20,
    // flex: 1,
    // textAlignVertical: 'center'
    // backgroundColor: 'red'
  }
})

export default ContactList