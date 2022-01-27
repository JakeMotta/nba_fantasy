import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function SectionTitle({title, rightElem}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      { rightElem }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
  },
});
