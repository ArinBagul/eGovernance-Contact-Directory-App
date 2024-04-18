import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";

import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";

import Search from "../components/Search";
import Colours from "../constants/Colours";
import Contacts from "./Contacts";
import { FocusAwareStatusBar } from "../App";

const Explore = () => {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const db = getDatabase();

  const fetchPsoData = async (psoRef) => {
    const snapshot = await get(psoRef);
    const dataSnapshot = snapshot.val();
    const formattedData = [];

    // Convert dataSnapshot to an array
    Object.keys(dataSnapshot).forEach((psoKey) => {
      const psoData = dataSnapshot[psoKey];
      // console.log(psoData.team);
      Object.keys(psoData).forEach((key) => {
        formattedData.push({
          id: key,
          name: psoData[key].name,
          role: psoData[key].designation,
          mobileNumber: psoData[key].mobileNumber,
          position: psoData[key].psName,
          psAddress: psoData[key].psAddress,
        });
      });
    });
    setAllContacts((prevContacts) => [...prevContacts, ...formattedData]);
  };

  const fetchAcoData = async (acRef) => {
    const snapshot = await get(acRef);
    const dataSnapshot = snapshot.val();
    const formattedData = [];

    // Convert dataSnapshot to an array
    Object.keys(dataSnapshot).forEach((acKey) => {
      const acData = dataSnapshot[acKey];
      // console.log(acData.team);
      Object.keys(acData).forEach((key) => {
        formattedData.push({
          id: key,
          name: acData[key].name,
          mobileNumber: acData[key].mobileNumber,
          role: acData[key].designation,
          position: acData[key].acName,
        });
      });
    });
    setAllContacts((prevContacts) => [...prevContacts, ...formattedData]);
  };

  const fetchDlnoData = async (dlnoRef) => {
    const snapshot = await get(dlnoRef);
    const dataSnapshot = snapshot.val();
    const formattedData = [];

    // Convert dataSnapshot to an array
    Object.keys(dataSnapshot).forEach((dlnoKey) => {
      const dlnoData = dataSnapshot[dlnoKey];
      // console.log(dlnoData.team);
      formattedData.push({
        id: dlnoKey,
        name: dlnoData.name,
        team: dlnoData.team,
        role: dlnoData.role,
        position: dlnoData.position,
        mobileNumber: dlnoData.mobileNumber,
      });
    });

    setAllContacts((prevContacts) => [...prevContacts,...formattedData]);
  };

  const fetchImpoData = async (impoRef) => {
    const snapshot = await get(impoRef);
    const dataSnapshot = snapshot.val();
    const formattedData = [];

    // Convert dataSnapshot to an array
    Object.keys(dataSnapshot).forEach((impoKey) => {
      const impoData = dataSnapshot[impoKey];
      // console.log(impoData.team);
      formattedData.push({
        id: impoKey,
        name: impoData.name,
        role: impoData.designation,
        position: 'IMP Officer',
        mobileNumber: impoData.mobileNumber,
      });
    });

    setAllContacts((prevContacts) => [...prevContacts,...formattedData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const psoRef = ref(db, "pso"); // Assuming 'dlno' is Firebase database node
      const dlnoRef = ref(db, "dlno"); // Assuming 'dlno' is Firebase database node
      const acRef = ref(db, "ac"); // Assuming 'aco' is Firebase database node
      const impoRef = ref(db, "impo"); // Assuming 'aco' is Firebase database node
      try {
        fetchPsoData(psoRef);
        fetchDlnoData(dlnoRef);
        fetchAcoData(acRef);
        fetchImpoData(impoRef);

        // Update state with formatted data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(allContacts);
  useEffect(() => {
    setFilteredContacts(allContacts);
  }, [allContacts]);

    // console.log(filteredContacts[400].team.includes("मटेरियल मैनेजमेंट"));
    
  return (
    <View>
      <FocusAwareStatusBar backgroundColor={Colours.dark} barStyle="light-content" animated={true} />
      <Search contentTitle="Explore" data={allContacts} setFilteredContacts={setFilteredContacts}  />
      <Contacts data={filteredContacts} />
    </View>
  );
};

export default Explore;
