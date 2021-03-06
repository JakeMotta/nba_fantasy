import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

let disabledText = "rgba(255,255,255, .5)";

export default function IconButton({icon, text, onPress, buttonStyle, disabled, direction}) {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.buttonWithIcon, {flexDirection: direction === "vertical" ? "row" : "column"}, buttonStyle, disabled && styles.disabledWrapper]} onPress={onPress}>
      <FontAwesome name={icon} size={24} color={disabled ? disabledText : "#6200ee"} style={styles.icon} />
      <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWithIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "#6200ee",
    borderWidth: 1,
  },
  disabledWrapper: {
    backgroundColor: "rgba(0,0,0, .15)",
    borderColor: "rgba(0,0,0, .15)"
  },
  disabledText: {
    color: disabledText,
  },
  icon: {
    marginRight: 10
  },
  text: {
    fontSize: 18,
    color: "#6200ee"
  }
});
