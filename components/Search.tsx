import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomTabBarIcon from "../constants/Icons";
import Colours from "../constants/Colours";

const Search = (props) => {
  return (
    <View style={style.searchContainer}>
      <View style={style.searchHeading}>
        <CustomTabBarIcon
          icon={`
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M7.58331 20.4167L16.3333 16.3333L20.4166 7.58334L11.6666 11.6667L7.58331 20.4167ZM14 15.1667C13.6694 15.1667 13.3925 15.0547 13.1693 14.8307C12.9461 14.6067 12.8341 14.3298 12.8333 14C12.8333 13.6695 12.9453 13.3926 13.1693 13.1693C13.3933 12.9461 13.6702 12.8341 14 12.8333C14.3305 12.8333 14.6078 12.9453 14.8318 13.1693C15.0558 13.3933 15.1674 13.6702 15.1666 14C15.1666 14.3306 15.0546 14.6078 14.8306 14.8318C14.6066 15.0558 14.3298 15.1675 14 15.1667ZM14 25.6667C12.3861 25.6667 10.8694 25.3602 9.44998 24.7473C8.03054 24.1345 6.79581 23.3034 5.74581 22.2542C4.69581 21.2042 3.86476 19.9695 3.25265 18.55C2.64054 17.1306 2.33409 15.6139 2.33331 14C2.33331 12.3861 2.63976 10.8695 3.25265 9.45001C3.86554 8.03057 4.69659 6.79584 5.74581 5.74584C6.79581 4.69584 8.03054 3.86479 9.44998 3.25268C10.8694 2.64057 12.3861 2.33412 14 2.33334C15.6139 2.33334 17.1305 2.63979 18.55 3.25268C19.9694 3.86557 21.2041 4.69662 22.2541 5.74584C23.3041 6.79584 24.1356 8.03057 24.7485 9.45001C25.3614 10.8695 25.6674 12.3861 25.6666 14C25.6666 15.6139 25.3602 17.1306 24.7473 18.55C24.1344 19.9695 23.3034 21.2042 22.2541 22.2542C21.2041 23.3042 19.9694 24.1356 18.55 24.7485C17.1305 25.3614 15.6139 25.6675 14 25.6667ZM14 23.3333C16.6055 23.3333 18.8125 22.4292 20.6208 20.6208C22.4291 18.8125 23.3333 16.6056 23.3333 14C23.3333 11.3945 22.4291 9.18751 20.6208 7.37918C18.8125 5.57084 16.6055 4.66668 14 4.66668C11.3944 4.66668 9.18748 5.57084 7.37915 7.37918C5.57081 9.18751 4.66665 11.3945 4.66665 14C4.66665 16.6056 5.57081 18.8125 7.37915 20.6208C9.18748 22.4292 11.3944 23.3333 14 23.3333Z" fill=${Colours.light}/>
                </svg>
                `}
          size={30}
          color={Colours.light}
        />
        <Text style={style.searchHeadingTxt}>{props.contentTitle}</Text>
      </View>

      <View style={style.searchBoxContainer}>
        <TextInput
          style={style.searchBox}
          caretHidden={false}
          selectionColor={Colours.lightBlue}
          placeholder="Type to search"
        />
        <TouchableOpacity style={style.searchBtn}>
          <CustomTabBarIcon
            icon={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M14.1667 14.1667L17.5 17.5M2.5 9.16667C2.5 10.9348 3.20238 12.6305 4.45262 13.8807C5.70286 15.131 7.39856 15.8333 9.16667 15.8333C10.9348 15.8333 12.6305 15.131 13.8807 13.8807C15.131 12.6305 15.8333 10.9348 15.8333 9.16667C15.8333 7.39856 15.131 5.70286 13.8807 4.45262C12.6305 3.20238 10.9348 2.5 9.16667 2.5C7.39856 2.5 5.70286 3.20238 4.45262 4.45262C3.20238 5.70286 2.5 7.39856 2.5 9.16667Z" stroke="#002D47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
            `}
            size={20}
            color={Colours.light}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colours.dark,
    padding: 20,
    gap: 15,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginBottom: 10,
  },
  searchHeading: {
    flexDirection: "row",
    gap: 6,
  },
  searchHeadingTxt: {
    color: Colours.light,
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 15,
    // backgroundColor: "red"
  },
  
  searchBoxContainer: {
    marginBottom: 10,
  },
  searchBox: {
    backgroundColor: Colours.light,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    color: Colours.dark,
  },
  searchBtn:{
    position:"absolute",
    right: 10,
    marginTop: 8,
  },
});

export default Search;
