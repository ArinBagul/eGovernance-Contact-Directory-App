import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { PureComponent } from "react";

import Colours from "../constants/Colours";
import { LinearGradient } from "expo-linear-gradient";

interface Data {
  boothName: string;
  boothAd: string;
}

interface Props {
  data: Data;
}

class ListItem extends PureComponent<Props> {
  // console.log(title)
  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity>
        <LinearGradient
          colors={["#007EC5", "#002D47", "#002D47"]}
          start={{ x: -0.5, y: 0 }}
          end={{ x: 2, y: 2 }}
          style={style.listItem}
        >
          <Text style={style.listItemHeadTxt}>
            {data.boothName}, {data.boothAd}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
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

export default ListItem;
