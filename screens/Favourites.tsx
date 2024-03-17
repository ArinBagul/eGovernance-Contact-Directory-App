import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import ContactCard from '../components/ContactCard';

const Favourites = () => {

  const [favorites, setFavorites] = useState([]);

  // Load favorites data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Function to remove a contact from favorites
  const removeFromFavorites = async (numberToRemove) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav.number !== numberToRemove);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // Render function for each contact
  const renderContact = ({ item }) => {
    return (
      <View style={styles.contactContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.designation}</Text>
        <Text>{item.position}</Text>
        <Text style={styles.number}>{item.number}</Text>
        <TouchableOpacity onPress={() => removeFromFavorites(item.number)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove from Favorites</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Return the component JSX
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderContact}
        keyExtractor={(item) => item.number}
        contentContainerStyle={favorites.length === 0 && styles.emptyContainer}
        ListEmptyComponent={<Text style={styles.noFavoritesText}>No favorites yet</Text>}
      />
    </View>
  );
};

// Define the component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff6961',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
  },
  noFavoritesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default Favourites