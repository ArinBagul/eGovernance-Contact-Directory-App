import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomTabBarIcon from "../constants/Icons";
import Colours from "../constants/Colours";
import Explore from "../screens/Explore";

const Recent = ({navigation}) => {
  return (
    <View>
      <View style={style.recentHead}>
        <CustomTabBarIcon
          icon={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 8H12V13L16.28 15.54L17 14.33L13.5 12.25V8ZM13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32386 4 9.61305 4 12H1L4.96 16.03L9 12H6C6 10.1435 6.7375 8.36301 8.05025 7.05025C9.36301 5.7375 11.1435 5 13 5C14.8565 5 16.637 5.7375 17.9497 7.05025C19.2625 8.36301 20 10.1435 20 12C20 13.8565 19.2625 15.637 17.9497 16.9497C16.637 18.2625 14.8565 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C7.47147 19.2006 8.46218 19.867 9.5542 20.3203C10.6462 20.7736 11.8176 21.0047 13 21C15.3869 21 17.6761 20.0518 19.364 18.364C21.0518 16.6761 22 14.3869 22 12C22 9.61305 21.0518 7.32386 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3Z" fill="#005788"/>
                </svg>`}
          size={24}
          color={Colours.lighterDark}
        />
        <Text style={style.recentText}>
          Recent <Text style={{ fontWeight: "bold" }}>Searches</Text>
        </Text>
      </View>

      <View style={style.recentMessage}>
        <Text style={style.messageTxt}>Haven’t explored yet?</Text>
        <TouchableOpacity onPress={ () => navigation.navigate(Explore)}>
          <Text style={[style.messageTxt, style.messageTxtClickable]}>
            Explore Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  recentContainer: {
    alignItems: "center",
  },
  recentHead: {
    // backgroundColor: "red",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  recentText: {
    fontSize: 16,
    color: Colours.lighterDark,
  },
  recentMessage: {
    backgroundColor: Colours.lightBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  messageTxt: {
    color: Colours.lighterDark,
    fontSize: 12,
  },
  messageTxtClickable: {
    color: Colours.lighterDark,
    fontWeight: "bold",
  },
});

export default Recent;
