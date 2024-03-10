import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ContactCard from '../components/ContactCard';


const Favourites = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const renderContact = ({ item }) => {
    // return <ContactCard contact={item} />;
    return(
    <View style={styles.contactContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.designation}</Text>
        <Text>{item.position}</Text>
        <Text style={styles.number}>{item.number}</Text>
      </View>)
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderContact}
          // keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>No favorites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
  },
  contactContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  number: {
    color: '#666',
  },
  noFavoritesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});


export default Favourites