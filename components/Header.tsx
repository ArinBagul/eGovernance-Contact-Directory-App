import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import Colours from "../constants/Colours";
import CustomTabBarIcon from "../constants/Icons";

const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
<rect x="1" y="1" width="8" height="8" rx="1" fill="none" stroke="#002D47" stroke-width="2"/>
<rect x="14" y="1" width="8" height="8" rx="1" fill="none" stroke="#002D47" stroke-width="2"/>
<rect x="14" y="14" width="8" height="8" rx="1" fill="none" stroke="#002D47" stroke-width="2"/>
<rect x="1" y="14" width="8" height="8" rx="1" fill="none" stroke="#002D47" stroke-width="2"/>
</svg>`;

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const ModalContent = () => {
    return (
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalHeading}><Text style={{color:Colours.primaryBlue}}>Electo</Text> Connect</Text>
          <Text style={style.modalText}>
            Electo Connect is the contact directory application for the Lok
            Sabha Elections 2024 addresses the critical need for effective
            communication infrastructure within the electoral ecosystem. Ensuring seamless
            coordination and dissemination of information among voters as well
            as major officers emerged as a pivotal aspect of the electoral
            process.
          </Text>
          <Text style={style.modalHeading}>Developers</Text>
          <Text style={style.modalText}>Arin Bagul</Text>
          <Text style={style.modalText}>Eshanchi Bajpai</Text>
          <Text style={style.modalText}>Kamakshi Sharma</Text>
          <Text style={style.modalText}>Mohammed Murtuza</Text>
        </View>
      </View>
    );
  };

  // const time = time
  const getGreeting = () => {
    const currentTime = new Date().getHours();
    let greeting;

    if (currentTime > 4 && currentTime < 12) {
      greeting = "Good Morning";
    } else if (currentTime > 12 && currentTime < 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    return greeting;
  };
  const greeting = getGreeting();

  return (
    <View style={style.headingContainer}>
      <View style={style.info}>
        <Text style={style.headingTxt}>
          Hello, <Text style={style.darkText}>Citizen!</Text>
        </Text>
        <Text style={style.lighterDarkText}>{greeting}</Text>
      </View>
      <View style={style.settings}>
        <TouchableOpacity onPress={toggleModal}>
          <CustomTabBarIcon icon={menuIcon} color={Colours.dark} size={23} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenModal}
        onRequestClose={toggleModal}
      >
        <ModalContent />
        <TouchableOpacity style={style.closeButton} onPress={toggleModal}>
          <Text style={style.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    // alignContent: 'center',
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colours.primaryBlue,
  },
  darkText: {
    color: Colours.dark,
  },
  lighterDarkText: {
    color: Colours.lighterDark,
  },
  info: {},
  settings: {},
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colours.light,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colours.dark,
  },
  modalText: {
    textAlign: 'justify',
    marginBottom: 5,
    color: Colours.lighterDark,
  },
  closeButton: {
    backgroundColor: Colours.dark,
    paddingVertical: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Header;
