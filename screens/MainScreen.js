import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MyTeam from "../components/MyTeams";
import CreateTeam from "../components/CreateTeam";
import { get } from "lodash";

let screens = {
  "create": "Create",
  "myTeam": "My Team"
}

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: screens.create,
      myTeams: {},
    };
  }
 
  render() {
    const { activeScreen, myTeams } = this.state;

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    // console.log(this.state.league.standard[0])
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.setState({activeScreen: screens.create})}
        onSwipeRight={(state) => this.setState({activeScreen: screens.myTeam})}
        config={config}
        style={styles.gestureWrapper}
        >
        <View style={styles.contentWrapper}>
        { activeScreen === screens.create ? <CreateTeam /> : <MyTeam teams={myTeams} onCreateTeam={() => this.setState({activeScreen: screens.create})} /> }
        </View>
      </GestureRecognizer>
    );
  }
}
 
export default MainScreen;

const styles = StyleSheet.create({
  gestureWrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  }
});