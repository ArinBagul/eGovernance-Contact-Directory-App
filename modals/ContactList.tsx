import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Search from '../components/Search'
import ContactCard from '../components/ContactCard';

const ContactList = ({route}) => {
  const data = route.params.data;
  return (
    <View>
      <Search contentTitle={`${data.boothName},${data.boothAd}`} />
      <ContactCard />
    </View>
  )
}

export default ContactList