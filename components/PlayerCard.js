import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { get } from "lodash";
import { FontAwesome } from '@expo/vector-icons'; 

export default function PlayerCard({player, type, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.removeContainer} onPress={() => onPress(get(player, "personId", ""))}>
        <FontAwesome name={type === "myRoster" ? "minus-circle" : "plus-circle"} size={32} color="black" style={styles.icon} />
      </TouchableOpacity>
      <Image source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${get(player, "personId", "")}.png`}} style={styles.playerImage} />
      <Text style={styles.title} numberOfLines={2} lineBreakMode="tail">{get(player, "firstName", "").concat(" ").concat(get(player, "lastName", ""))}</Text>
      <Text style={styles.subtitle}>{get(player, "teamSitesOnly.posFull", "")}</Text>

      {/* These WERE NOT clear in the JSON data, and there was nothing indicating where to get it in the JSON or instructions. */}
      <Text style={styles.subtitle}>Team City</Text>
      <Text style={styles.subtitle}>Team Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#6200ee",
    borderWidth: 1,
    padding: 15,
    marginRight: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 225,
  },
  removeContainer: {
    width: "100%",
    alignItems: "flex-end"
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16
  }
});
