import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Colours from '../constants/Colours'
import Banner from '../components/Banner'
import Recent from '../components/Recent'
import Places from '../components/Places'
import Officers from '../components/Officers'


const Home = ({navigation}) => {
  return (
    <View>
      <StatusBar backgroundColor={Colours.light} barStyle="dark-content" />
      <View style={style.appContainer}>
        <Header/>
        <Banner/>
        <Recent/>
        <Places navigation={navigation} />
        <Officers navigation={navigation}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  appContainer:{
    gap: 20,
    paddingVertical: 20,
  }
})

export default Home