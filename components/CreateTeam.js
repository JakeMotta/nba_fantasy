import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import IconButton from "./IconButton";
import { TextInput } from "react-native-paper";
import { get } from "lodash";
import players from "../assets/players.json";
import axios from "axios";
import SectionTitle from "./SectionTitle";
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import PlayerCard from "./PlayerCard";

export default function CreateTeam() {
  
  const [teamCity, setTeamCity] = useState("");
  const [teamName, setTeamName] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);
  const [gamePositions, setGamePositions] = useState({})
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  let league = get(players, "league", {});
  let leagueTeams = Object.keys(league);
  
  useEffect(() => {
    let allPlayersMap = {};
    let allPlayers = [];
    leagueTeams.forEach(team => {
      league[team].forEach(player => {
        if(!allPlayersMap[get(player, "personId", "")]) {
          allPlayersMap[get(player, "personId", "")] = player;
          allPlayers.push(player);
        }
      })
    });

    setAllPlayers(allPlayers);
    console.log(allPlayers.length);
  }, []);

  const renderItem = ({item}) => {
    return(<PlayerCard player={item} />)
  };

  return (
    <View style={styles.container}>
      <SectionTitle title={"Create Team"} />

      <ScrollView style={styles.scrollViewWrapper}>
        <Text style={styles.title}>Team Details</Text>
        <TextInput 
          label={"Team City"}
          value={teamCity}
          onChangeText={teamCity => setTeamCity(teamCity)}
          style={styles.inputStyle}
        />
        <TextInput 
          label={"Team Name"}
          value={teamName}
          onChangeText={teamName => setTeamName(teamName)}
          style={styles.inputStyle}
        />

        <SectionTitle title={"My Roster"} />

        <SectionTitle
          title={"Available Players"}
          rightElem={
            <SelectDropdown
              data={countries}
              defaultButtonText={"Filter"}
              renderDropdownIcon={() => <FontAwesome name={"filter"} size={24} color="black" />}
              onSelect={selectedItem => setFilter(selectedItem)}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
              buttonTextStyle={styles.dropDownText}
            />
          }
        />

        <FlatList
          data={allPlayers}
          renderItem={renderItem}
          keyExtractor={item => item.playerId}
          initialNumToRender={10}
          horizontal={true}
        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1
  },
  title: {
    fontSize: 18,
    paddingBottom: 15,
  },
  scrollViewWrapper: {
    marginVertical: 5,
    flex: 1
  },
  inputStyle: {
    // borderRadius: 25
    marginBottom: 15,
  },
  dropDownText: {
    textAlign: "right"
  }
});
