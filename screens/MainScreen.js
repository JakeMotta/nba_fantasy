import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import MyTeam from "../components/MyTeams";
import CreateTeam from "../components/CreateTeam";
import { get } from "lodash";
import players from "../assets/players.json";
import { BottomNavigation } from 'react-native-paper';

let routes = [
  { key: 'myTeams', title: 'My Teams', icon: 'minus' },
  { key: 'create', title: 'Create Team', icon: 'plus' }
]

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: 0,
      myTeams: [],
      availableRoster: [],
      myRoster: [],
      allPlayersMap: {},
      gamePositions: ["point guard", "shooting guard", "power forward", "small forward", "center", "point forward", "forward", "forward-center", "guard"],
      gamePositionsMap: {}
    };
  }

  componentDidMount() {
    let league = get(players, "league", {});
    let leagueTeams = Object.keys(league);
    
    let allPlayersMap = {};
    let availableRoster = [];
    let gamePositionsMap = {};

    leagueTeams.forEach(team => {
      league[team].forEach(player => {
        if(!allPlayersMap[get(player, "personId", "")]) {
          allPlayersMap[get(player, "personId", "")] = player;
          availableRoster.push(player);
          gamePositionsMap[get(player, "teamSitesOnly.posFull", "")] = true;
        }
      })
    });

    this.setState({ allPlayersMap, availableRoster, gamePositionsMap }, () => {
      console.log("mount state: ", this.state)
    });
  }

  saveTeam = (team) => {
    let myTeams = [...this.state.myTeams];
    myTeams.push(team);

    this.setState({myTeams, activeScreen: 0})
  }

  addPlayerToRoster = (personId) => {
    console.log("hit player: ", personId)
    const { allPlayersMap } = this.state;
    let availableRoster = [...this.state.availableRoster];
    let myRoster = [...this.state.myRoster];

    for(let i = 0; i < availableRoster.length; i++) {
      if(get(availableRoster[i], "personId", "") === personId) {
        availableRoster.splice(i, 1);
        break;
      } 
    }

    myRoster.push(allPlayersMap[personId]);

    this.setState({ myRoster, availableRoster }, () => {
      console.log("hit: ", this.state)
    });
  }
 
  render() {
    const { activeScreen, myTeams, availableRoster, myRoster, gamePositions } = this.state;

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      // <GestureRecognizer
      //   onSwipeLeft={() => this.setState({activeScreen: screens.create})}
      //   onSwipeRight={() => this.setState({activeScreen: screens.myTeam})}
      //   config={config}
      //   style={styles.gestureWrapper}
      //   >
      //   <View style={styles.contentWrapper}>
      //   { activeScreen === screens.create ? <CreateTeam availableRoster={availableRoster} myRoster={myRoster} gamePositions={gamePositions} addPlayerToRoster={this.addPlayerToRoster} saveTeam={this.saveTeam} /> : <MyTeam teams={myTeams} onCreateTeam={() => this.setState({activeScreen: screens.create})} /> }
      //   </View>
      // </GestureRecognizer>

      <View style={styles.contentWrapper}>      
        <BottomNavigation
          navigationState={{ index: activeScreen, routes }}
          onIndexChange={activeScreen => this.setState({activeScreen})}
          renderScene={
            BottomNavigation.SceneMap({
              myTeams: () => MyTeam({teams: myTeams, onCreateTeam: () => this.setState({activeScreen: 1})}),
              create: () => CreateTeam({availableRoster, myRoster, gamePositions, addPlayerToRoster: this.addPlayerToRoster, saveTeam: this.saveTeam}),
            })
          }
          />
      </View>
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