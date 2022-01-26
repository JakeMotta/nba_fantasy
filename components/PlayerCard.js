import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import IconButton from "./IconButton";
import { TextInput } from "react-native-paper";
import { get } from "lodash";
import players from "../assets/players.json";
import axios from "axios";

export default function PlayerCard({player}) {
  
  const [teamCity, setTeamCity] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  

  useEffect(() => {
    fetchPlayerProfileImage(get(player, "personId", ""));
  }, []);

  const fetchPlayerProfileImage = async (personId) => {
    let query = {
      method: "get",
      url: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`,
      headers: {}
    }

    axios(query).then(res => {
      console.log("hit res: ", res);
      if(res) setPlayerImage(res);
    }).catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${get(player, "personId", "")}.png`}} style={styles.playerImage} />
      <Text style={styles.title}>{get(player, "firstName", "").concat(" ").concat(get(player, "lastName", ""))}</Text>
      <Text style={styles.subtitle}>{get(player, "teamSitesOnly.posFull", "")}</Text>
      <Text style={styles.subtitle}>Create Team</Text>
      <Text style={styles.subtitle}>Create Team</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "gray",
    padding: 15,
    marginRight: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 16
  }
});
