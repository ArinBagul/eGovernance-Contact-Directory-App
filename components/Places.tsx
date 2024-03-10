import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomTabBarIcon from "../constants/Icons";
import Colours from "../constants/Colours";

import Card from "./Card";

import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig";

const Places = ({ navigation }) => {
  const [placesData, setPlacesData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Reference to the "district" node in your Firebase database
    const dbRef = ref(getDatabase(app), "district");

    // Listen for changes in the data
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const placesArray = Object.entries(data).reduce(
        (acc, [district, locations]) => {
          Object.entries(locations).forEach(([locationId, locationData]) => {
            acc.push({ district, ...locationData });
          });
          return acc;
        },
        []
      );
      setPlacesData(placesArray);
    });
  }, []);

  const handlePSCardClick = (place) => {
    setIsOpenModal(false);
    navigation.navigate("PollingStation", {
      data: place.place,
    });
  };

  const renderModal = (place) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenModal}
        onRequestClose={() => setIsOpenModal(!isOpenModal)}
      >
        <View style={style.modalContainer}>
          <View style={style.container}>
            <TouchableOpacity
              style={style.backBtn}
              onPress={() => setIsOpenModal(!isOpenModal)}
            >
              <CustomTabBarIcon
                icon={`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M21 10.5L14 17.5L7 10.5" stroke="#002D47" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`}
                size={28}
                color={Colours.light}
              />
            </TouchableOpacity>
            <View style={style.CardContainer}>
              <TouchableOpacity>
                <Card contentTitle="AC Level" pc="ACO" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePSCardClick(place)}>
                <Card contentTitle="Polling Stations" pc="PS" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const onPlaceCardPress = (place) => {
    setIsOpenModal(true);
    setSelectedPlace(place);
  };

  return (
    <View style={style.placeContainer}>
      <View style={style.placeSectionHeading}>
        <Text style={style.placeSectionHeadingTxt}>
          Explore by <Text style={{ fontWeight: "bold" }}>places</Text>
        </Text>
        <CustomTabBarIcon
          icon={`<svg xmlns="http://www.w3.org/2000/svg" width="23" height="8" viewBox="0 0 23 8" fill="none">
                <path d="M0.5 3.29999C0.223858 3.29999 2.41411e-08 3.52385 0 3.79999C-2.41411e-08 4.07613 0.223858 4.29999 0.5 4.29999L0.5 3.29999ZM22.8536 4.15354C23.0488 3.95828 23.0488 3.6417 22.8536 3.44644L19.6716 0.264456C19.4763 0.0691934 19.1597 0.0691933 18.9645 0.264456C18.7692 0.459718 18.7692 0.7763 18.9645 0.971562L21.7929 3.79999L18.9645 6.62842C18.7692 6.82368 18.7692 7.14026 18.9645 7.33552C19.1597 7.53079 19.4763 7.53079 19.6716 7.33552L22.8536 4.15354ZM0.5 4.29999L22.5 4.29999L22.5 3.29999L0.5 3.29999L0.5 4.29999Z" fill="#005788"/>
                </svg>`}
          size={30}
          color={Colours.blueForDark}
        />
      </View>

      <View style={style.placeCardContainer}>
        {placesData.map((place, index) => (
          <TouchableOpacity key={index} onPress={() => onPlaceCardPress(place)}>
            <Card key={index} contentTitle={place.place} pc={place.pc} />
          </TouchableOpacity>
        ))}
      </View>
      {isOpenModal ? renderModal(selectedPlace) : null}
    </View>
  );
};

const style = StyleSheet.create({
  placeContainer: {},
  placeSectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  placeSectionHeadingTxt: {
    fontSize: 16,
    color: Colours.lighterDark,
  },
  placeCardContainer: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: Colours.light,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  CardContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 20,
    marginBottom: 10,
  },
  backBtn: {
    alignSelf: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

export default Places;
