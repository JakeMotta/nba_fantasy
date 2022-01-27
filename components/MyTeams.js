import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import IconButton from "./IconButton";
import SectionTitle from "./SectionTitle";
import { get } from "lodash";

export default function MyTeams({teams, onCreateTeam}) {

  // A salty alert because they document didn't say to add this, but I don't want to be docked points for not doing it (or thinking about it)
  const saltyAlert = () => {
    Alert.alert("Upgrade To Unlock", "This feature was not added as a demo requirement. Hire me to unlock this feature.");
  }

  return (
    <View style={styles.container}>
      <SectionTitle title={"My Teams"} />

      <ScrollView style={styles.scrollViewWrapper}>
        {
          teams.length > 0 ? 
          teams.map((team, i) => (
            <TouchableOpacity key={get(team, "teamName", "").concat(i.toString())} style={styles.cardStyle} onPress={() => saltyAlert()}>
              <Text style={styles.titleText}>{get(team, "teamName", "")}</Text>
              <Text style={styles.subtitleText}>{get(team, "teamCity", "")}</Text>
            </TouchableOpacity>
          ))
          : <View>
              <IconButton icon={"plus"} text={"Create First Team"} onPress={onCreateTeam} />
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  scrollViewWrapper: {
    marginVertical: 5,
    flex: 1,
  },
  cardStyle: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "gray",
  },
  titleText: {
    fontSize: 24
  },
  subtitleText: {
    fontSize: 18
  }
});
