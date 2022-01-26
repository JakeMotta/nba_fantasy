import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import IconButton from "./IconButton";
import SectionTitle from "./SectionTitle";

export default function MyTeams({teams, onCreateTeam}) {
  return (
    <View style={styles.container}>
      <SectionTitle title={"My Teams"} />
      {
        Object.keys(teams).length > 0 ? 
        <View><Text>asdf</Text></View>
        : <View>
            <IconButton icon={"plus"} text={"Create First Team"} onPress={onCreateTeam} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "transparent"
  },
});
