import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colours from '../constants/Colours'


const Header = () => {
  return (
    <View style={style.headingContainer}>
        <Text style={style.headingTxt}>Hello, <Text style={style.darkText}>Citizen!</Text></Text>
        <Text style={style.lighterDarkText}>Good Morning</Text>
    </View>
  )
}

const style = StyleSheet.create({
    headingContainer: {
        paddingHorizontal: 20,
    },
    headingTxt : {
        fontSize: 24,
        fontWeight: "bold",
        color: Colours.primaryBlue,
    },
    darkText:{
        color: Colours.dark,
    },
    lighterDarkText:{
        color: Colours.lighterDark,
    },
})

export default Header