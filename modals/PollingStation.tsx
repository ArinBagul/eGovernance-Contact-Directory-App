import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ContactList from './ContactList'
import Search from '../components/Search'


const PollingStation = ({route,navigation}) => {

  

  console.log(route.params.data)

  return (
    <View>
      <Search />
      <Text>place : </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default PollingStation