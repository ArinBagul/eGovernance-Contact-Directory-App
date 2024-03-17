import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colours from '../constants/Colours';

const DlnoList = ({ data, navigation }) => {

  const handleOnPress = () => {
    navigation.navigate("DlnoDetails", data)
  }

  return (
    <TouchableOpacity onPress={()=>handleOnPress()}>
      <LinearGradient
          colors={["#007EC5", "#002D47", "#002D47"]}
          start={{ x: -0.5, y: 0 }}
          end={{ x: 2, y: 2 }}
          style={styles.listItem}
        >
          <Text style={styles.listItemHeadTxt}>
            {data.team}
          </Text>
        </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 20,
    width: "100%",
    marginBottom: 10,
  },
  listItemHeadTxt: {
    color: Colours.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DlnoList;
