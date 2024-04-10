import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import Search from "../components/Search";
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { app } from '../firebaseConfig';
import ContactCard from '../components/ContactCard';


const Aco = ({ route, navigation }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const modalData = route.params.data; // name of the place "Agar"
  // console.log(acData)

  const [aco, setAco] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);
    const acoRef = ref(database, `ac/${modalData}`);

    const fetchAco = () => {
      onValue(
        acoRef,
        (snapshot) => {
          const acoData = snapshot.val();
          if (acoData) {
            // Convert object to array of PSO entries
            const acoArray = Object.keys(acoData).map((key) => ({
              id: key,
              name: acoData[key].name,
              position: acoData[key].designation,
              mobileNumber: acoData[key].mobileNumber,
              role: "AC Level Officer"
            }));
            setAco(acoArray);
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
      off(acoRef);
    };
  }, []);

  useEffect(() => {
    setFilteredContacts(aco);
  }, [aco]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Search contentTitle={`ACO: ${modalData}`} data={aco} setFilteredContacts={setFilteredContacts} />
      {filteredContacts.length === 0 ? (
        <Text style={styles.errorContainer} >No data found</Text>
      ) :  <FlatList
        data={filteredContacts}
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
  errorContainer:{
    textAlign: 'center',
    marginTop: 20,
  },
})

export default Aco