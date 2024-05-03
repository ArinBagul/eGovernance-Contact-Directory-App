import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import Search from '../components/Search';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactCard from '../components/ContactCard';
import Colours from '../constants/Colours';
import { FocusAwareStatusBar } from '../App';

const Favourites = ({ navigation }) => { // Assuming you're using navigation prop
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const favoriteKeys = allKeys.filter(async (key) => {
        const value = await AsyncStorage.getItem(key);
        return value !== null;
      });
      const favoriteItems = await AsyncStorage.multiGet(favoriteKeys);
      setFavoriteItems(favoriteItems.map(([key, value]) => JSON.parse(value)));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // Handle error (e.g., show error message to the user)
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch favorites when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  useEffect(() => {
    setFilteredContacts(favoriteItems);
  }, [favoriteItems]);

  return (
    <View>
      <FocusAwareStatusBar backgroundColor={Colours.dark} barStyle="light-content" animated={true} />
      <Search contentTitle="Favourites" data={favoriteItems} setFilteredContacts={setFilteredContacts} />
      <View style={styles.favContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : filteredContacts.length > 0 ? (
          <FlatList
            data={filteredContacts}
            renderItem={({ item }) => (
              <ContactCard data={item} />
            )}
            keyExtractor={(item) => String(item.id)} // Assuming 'id' is the unique identifier of your items
          />
        ) : (
          <Text style={styles.status}>Oops! <Text style={styles.boldMsg}>No favorites</Text> here yet</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  favContainer: {
    
  },
  status:{
    marginTop: 20,
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
})

export default Favourites;