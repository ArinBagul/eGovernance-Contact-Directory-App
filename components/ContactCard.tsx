import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useState } from "react";
import CustomTabBarIcon from "../constants/Icons";
import Colours from "../constants/Colours";
import AsyncStorage from "@react-native-async-storage/async-storage";

const heartOutline = `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="solar:heart-outline">
<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M6.327 4.977C4.46063 5.82975 3.09375 7.85925 3.09375 10.2791C3.09375 12.7507 4.10625 14.6565 5.55525 16.29C6.75113 17.6355 8.19788 18.7515 9.60863 19.8382C9.94388 20.097 10.2769 20.3546 10.6043 20.6122C11.196 21.0791 11.7236 21.4875 12.2333 21.7856C12.7418 22.0826 13.1513 22.2187 13.5 22.2187C13.8488 22.2187 14.2583 22.0837 14.7668 21.7856C15.2764 21.4875 15.804 21.0791 16.3958 20.6122C16.722 20.3535 17.0561 20.097 17.3914 19.8394C18.8021 18.7504 20.2489 17.6355 21.4448 16.29C22.8949 14.6565 23.9063 12.7507 23.9063 10.2791C23.9063 7.86037 22.5394 5.82975 20.673 4.977C18.8595 4.14787 16.4228 4.36725 14.1075 6.77362C14.0288 6.85528 13.9344 6.92024 13.8301 6.9646C13.7257 7.00897 13.6134 7.03183 13.5 7.03183C13.3866 7.03183 13.2743 7.00897 13.17 6.9646C13.0656 6.92024 12.9712 6.85528 12.8925 6.77362C10.5773 4.36725 8.1405 4.14787 6.327 4.977ZM13.5 5.0175C10.899 2.68875 7.98638 2.3625 5.625 3.44138C3.13425 4.58325 1.40625 7.22925 1.40625 10.2802C1.40625 13.2784 2.655 15.5666 4.29413 17.4116C5.60588 18.8887 7.21125 20.1251 8.62988 21.2164C8.95163 21.4639 9.26325 21.7046 9.55913 21.9386C10.1363 22.3931 10.755 22.8769 11.3816 23.2436C12.0083 23.6092 12.7238 23.9074 13.5 23.9074C14.2763 23.9074 14.9918 23.6092 15.6184 23.2436C16.2461 22.8769 16.8638 22.3931 17.4409 21.9386C17.749 21.6958 18.0588 21.4551 18.3701 21.2164C19.7876 20.1251 21.3941 18.8876 22.7059 17.4116C24.345 15.5666 25.5938 13.2784 25.5938 10.2802C25.5938 7.22925 23.8669 4.58325 21.375 3.44363C19.0136 2.36363 16.101 2.68988 13.5 5.0175Z" fill="white"/>
</g>
</svg>`;

const heatFilled = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
<path d="M8.5 4C6 4 4.69268 4.49141 3.49999 6C2.38351 7.41219 2.49999 8.74264 2.49999 10.5C2.49999 12.2574 2.70802 13.3833 3.49999 15C4.59334 17.2319 6.04737 17.9379 7.99999 19.5C9.51625 20.713 11.9941 22.1526 13.0259 22.7355C13.3212 22.9023 13.679 22.903 13.9747 22.737C15.0019 22.1603 17.4617 20.7374 19 19.5C20.9366 17.9423 22.4066 17.2319 23.5 15C24.292 13.3833 24.5 12.2574 24.5 10.5C24.5 8.74264 24.6088 7.41825 23.5 6C22.2047 4.34319 20.4526 4 18.5 4C17.0907 4 15.1111 5.04186 14.1186 5.62165C13.7448 5.83996 13.2713 5.81852 12.9103 5.57975C12.0234 4.99315 10.2617 4 8.5 4Z" fill="#F0F0F0"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.327 4.977C4.46063 5.82975 3.09375 7.85925 3.09375 10.2791C3.09375 12.7508 4.10625 14.6565 5.55525 16.29C6.75113 17.6355 8.19788 18.7515 9.60863 19.8382C9.94388 20.097 10.2769 20.3546 10.6043 20.6122C11.196 21.0791 11.7236 21.4875 12.2333 21.7856C12.7418 22.0826 13.1513 22.2187 13.5 22.2187C13.8488 22.2187 14.2583 22.0837 14.7668 21.7856C15.2764 21.4875 15.804 21.0791 16.3958 20.6122C16.722 20.3535 17.0561 20.097 17.3914 19.8394C18.8021 18.7504 20.2489 17.6355 21.4448 16.29C22.8949 14.6565 23.9063 12.7508 23.9063 10.2791C23.9063 7.86038 22.5394 5.82975 20.673 4.977C18.8595 4.14788 16.4228 4.36725 14.1075 6.77363C14.0288 6.85529 13.9344 6.92024 13.8301 6.9646C13.7257 7.00897 13.6134 7.03184 13.5 7.03184C13.3866 7.03184 13.2743 7.00897 13.17 6.9646C13.0656 6.92024 12.9712 6.85529 12.8925 6.77363C10.5773 4.36725 8.1405 4.14788 6.327 4.977ZM13.5 5.0175C10.899 2.68875 7.98638 2.3625 5.625 3.44138C3.13425 4.58325 1.40625 7.22925 1.40625 10.2803C1.40625 13.2784 2.655 15.5666 4.29413 17.4116C5.60588 18.8888 7.21125 20.1251 8.62988 21.2164C8.95163 21.4639 9.26325 21.7046 9.55913 21.9386C10.1363 22.3931 10.755 22.8769 11.3816 23.2436C12.0083 23.6092 12.7238 23.9074 13.5 23.9074C14.2763 23.9074 14.9918 23.6092 15.6184 23.2436C16.2461 22.8769 16.8638 22.3931 17.4409 21.9386C17.749 21.6958 18.0588 21.4551 18.3701 21.2164C19.7876 20.1251 21.3941 18.8876 22.7059 17.4116C24.345 15.5666 25.5938 13.2784 25.5938 10.2803C25.5938 7.22925 23.8669 4.58325 21.375 3.44363C19.0136 2.36363 16.101 2.68988 13.5 5.0175Z" fill="#F0F0F0"/>
</svg>`;

const ContactCard = ({data}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // const contact = {
  //   number: "9098273132",
  //   name: "Arin Bagul",
  //   designation: "Technical Lead, Agar Malwa",
  //   position: "Software Developer",
  // };
  // const { name, mobileNumber, office, position, role } = data;
  // console.log(data)

  const toggleFavorite = async () => {
    try {
      // Load existing favorites from storage
      const favoritesString = await AsyncStorage.getItem('favorites');
      let favorites = favoritesString ? JSON.parse(favoritesString) : [];
  
      // Log existing favorites before toggle
      console.log('Existing favorites:', favorites);
  
      // Toggle favorite status
      if (isFavorite) {
        favorites = favorites.filter((favContact) => favContact !== data);
      } else {
        favorites.push(data);
      }
  
      // Log updated favorites after toggle
      console.log('Updated favorites:', favorites);
  
      // Save updated favorites to storage
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  
      // Update state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  

  // const number = "9098273132"

  const handleCallPress = () => {
    // Linking.openURL(`tel:${number}`)
    Linking.openURL(`tel:${data.mobileNumber}`);
  };

  return (
    <View style={style.cardContainer}>
      <Text style={style.nameTxt}>{data.name}</Text>
      <Text style={style.designationTxt}>{data.role}</Text>

      <View style={style.bottomContainer}>
        <Text style={style.position}>{data.position}</Text>

        <View style={style.iconsContainer}>
          <TouchableOpacity style={style.heartBtn} onPress={toggleFavorite}>
            {isFavorite ? (
              <CustomTabBarIcon
                icon={heatFilled}
                size={27}
                color={Colours.dark}
              />
            ) : (
              <CustomTabBarIcon
                icon={heartOutline}
                size={27}
                color={Colours.dark}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.callBtn}
            onPress={() => {
              handleCallPress();
            }}
          >
            <CustomTabBarIcon
              icon={`
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.625 17.5C14.8889 17.5 13.1736 17.1217 11.4792 16.365C9.78472 15.6083 8.24306 14.5353 6.85417 13.1458C5.46528 11.757 4.3925 10.2153 3.63583 8.52084C2.87917 6.8264 2.50056 5.11112 2.5 3.37501C2.5 3.12501 2.58333 2.91667 2.75 2.75001C2.91667 2.58334 3.125 2.50001 3.375 2.50001H6.75C6.94444 2.50001 7.11806 2.56612 7.27083 2.69834C7.42361 2.83056 7.51389 2.98667 7.54167 3.16667L8.08333 6.08334C8.11111 6.30556 8.10417 6.49306 8.0625 6.64584C8.02083 6.79862 7.94444 6.93056 7.83333 7.04167L5.8125 9.08334C6.09028 9.59723 6.42 10.0936 6.80167 10.5725C7.18333 11.0514 7.60361 11.5133 8.0625 11.9583C8.49306 12.3889 8.94444 12.7883 9.41667 13.1567C9.88889 13.525 10.3889 13.8617 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1633 11.9897 13.365 11.9275C13.5667 11.8653 13.7644 11.8478 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6147 17.3125 12.7608C17.4375 12.907 17.5 13.07 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z" fill="white"/>
                        </svg>
                    `}
              size={20}
              color={Colours.light}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colours.dark,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  nameTxt: {
    color: Colours.light,
    fontSize: 16,
    fontWeight: "bold",
  },
  designationTxt: {
    color: Colours.blueForDark,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  position: {
    backgroundColor: Colours.light,
    paddingHorizontal: 5,
    fontSize: 10,
    borderRadius: 3,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  heartBtn: {},
  callBtn: {
    backgroundColor: "#00C17C",
    padding: 5,
    borderRadius: 50,
  },
});

export default ContactCard;
