import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig";
import Colours from "../constants/Colours";
import { LinearGradient } from "expo-linear-gradient";

const Message = () => {
  const [message, setMessage] = useState({
    heading: "",
    notifyBody: "",
    isActionBtnNeeded: false,
    actionText: "",
    actionLink: "",
  });
  const [modalVisible, setModalVisible] = useState(Boolean);

  useEffect(() => {
    const db = getDatabase();
    const notifyRef = ref(db, "notification");

    onValue(notifyRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setModalVisible(data.isEnabled || false);
        setMessage({
          heading: data.heading,
          notifyBody: data.notifyBody,
          isActionBtnNeeded: data.isActionBtnNeeded,
          actionText: data.actionText,
          actionLink: data.actionLink,
        });
      }
    });
  }, []);

  const handleActionPress = async () => {
    await Linking.openURL(message.actionLink);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.bgEffect}>
          <View style={styles.msgContainer}>
            <Text style={styles.heading}>{message.heading}</Text>
            <Text style={styles.msgBody}>{message.notifyBody}</Text>
            <View style={styles.btnContainer}>
              {message.isActionBtnNeeded && (
                <TouchableOpacity onPress={handleActionPress}>
                  <LinearGradient
                    colors={["#007EC5", "#002D47", "#002D47"]}
                    start={{ x: 0.01, y: 0.01 }}
                    style={styles.primaryBtn}
                  >
                    <Text style={{ color: Colours.light, fontWeight: "700" }}>
                      {message.actionText}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.secBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: Colours.dark }}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bgEffect: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  msgContainer: {
    backgroundColor: Colours.light,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    gap: 15,
  },
  heading: {
    color: Colours.dark,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  msgBody: {
    color: Colours.lighterDark,
    fontSize: 14,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  primaryBtn: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  secBtn: {
    backgroundColor: Colours.light,
    borderColor: Colours.dark,
    borderWidth: 1.2,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});

export default Message;
