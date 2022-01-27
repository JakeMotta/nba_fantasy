import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MainScreen from "./screens/MainScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NBA Fantasy</Text>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15
  },
});