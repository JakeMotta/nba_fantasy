import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { TextInput } from "react-native-paper";
import SectionTitle from "./SectionTitle";
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import PlayerCard from "./PlayerCard";
import IconButton from "./IconButton";

export default function CreateTeam({myRoster, filteredPlayers, gamePositions, setFilter, addPlayerToRoster, removePlayerFromRoster, saveTeam}) {
  
  const [teamCity, setTeamCity] = useState("");
  const [teamName, setTeamName] = useState("");

  return (
    <View style={styles.container}>
      <SectionTitle title={"Create Team"} />

      <ScrollView style={styles.scrollViewWrapper}>
        <Text style={styles.title}>Team Details</Text>
        <TextInput 
          label={"Team City"}
          value={teamCity}
          onChangeText={value => setTeamCity(value)}
          style={styles.inputStyle}
        />
        <TextInput 
          label={"Team Name"}
          value={teamName}
          onChangeText={value => setTeamName(value)}
          style={[styles.inputStyle, styles.sectionEnd]}
        />

        {
          myRoster.length > 0 && 
          <>
            <SectionTitle title={"My Roster"} />

            <FlatList
              data={myRoster}
              renderItem={item => (<PlayerCard player={item?.item} key={item?.item?.personId} type={"myRoster"} onPress={removePlayerFromRoster} />)}
              keyExtractor={item => item?.personId}
              horizontal={true}
              style={styles.sectionEnd}
            />
          </>
        }

        <SectionTitle
          title={"Available Players"}
          rightElem={
            <SelectDropdown
              data={gamePositions}
              defaultButtonText={"Filter"}
              renderDropdownIcon={() => <FontAwesome name={"filter"} size={24} color="black" />}
              onSelect={filter => setFilter(filter)}
              buttonTextAfterSelection={selectedItem => selectedItem}
              rowTextForSelection={item => item}
              buttonStyle={{backgroundColor: "transparent"}}
              buttonTextStyle={styles.dropDownText}
            />
          }
        />

        <FlatList
          data={filteredPlayers}
          renderItem={item => (<PlayerCard player={item?.item} key={item?.item?.personId} type={"availableRoster"} onPress={addPlayerToRoster} />)}
          keyExtractor={item => item?.personId}
          horizontal={true}
          style={styles.sectionEnd}
        />

        <IconButton icon={"save"} text={"Save Team"} onPress={() => saveTeam({teamName, teamCity, roster: myRoster})} disabled={!teamCity || !teamName || myRoster.length < 1} />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
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
    marginBottom: 15,
  },
  dropDownText: {
    textAlign: "right"
  },
  sectionEnd: {
    marginBottom: 50
  }
});
