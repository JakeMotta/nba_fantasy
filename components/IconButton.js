import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function IconButton({icon, text, onPress, buttonStyle}) {
  return (
    <TouchableOpacity style={[styles.buttonWithIcon, buttonStyle]} onPress={onPress}>
      <FontAwesome name={icon} size={24} color="black" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10
  },
  text: {
    fontSize: 18,
  }
});
