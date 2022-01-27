import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import MyTeam from "../components/MyTeams";
import CreateTeam from "../components/CreateTeam";
import { get, isEqual } from "lodash";
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
      gamePositionsMap: {},
      teamName: "",
      teamCity: "",
      filter: "",
      filteredPlayers: [],
    };
  }

  componentDidMount() {
    let league = get(players, "league", {});
    let leagueTeams = Object.keys(league);
    
    let allPlayersMap = {};
    let availableRoster = [];
    let gamePositionsMap = {
      "None": true,
    };

    leagueTeams.forEach(team => {
      league[team].forEach(player => {
        if(!allPlayersMap[get(player, "personId", "")]) {
          allPlayersMap[get(player, "personId", "")] = player;
          availableRoster.push(player);

          let position = get(player, "teamSitesOnly.posFull", "");
          if(position) gamePositionsMap[position] = true;
        }
      })
    });

    this.setState({ allPlayersMap, availableRoster, gamePositionsMap, filteredPlayers: availableRoster });
  }

  componentDidUpdate(prevProps, prevState) {
    if(!isEqual(get(this.state, "availableRoster", {}), get(prevState, "availableRoster"), {}) || !isEqual(get(this.state, "filter", {}), get(prevState, "filter"), {})) {
      const { availableRoster, filter } = this.state;
      console.log("hit filter update")
      let filteredPlayers = [];
  
      if(filter && filter !== "None") {
        availableRoster.forEach(player => {
          if(get(player, "teamSitesOnly.posFull", "") === filter) filteredPlayers.push(player);
        })
      } else filteredPlayers = availableRoster;

      this.setState({ filteredPlayers });
    }
  }

  saveTeam = (team) => {
    let myTeams = [...this.state.myTeams];
    myTeams.push(team);

    this.setState({myTeams, activeScreen: 0})
  }

  addPlayerToRoster = (personId) => {
    const { allPlayersMap } = this.state;
    let availableRoster = [...this.state.availableRoster];
    let myRoster = [...this.state.myRoster];

    for(let i = 0; i < availableRoster.length; i++) {
      if(get(availableRoster[i], "personId", "") === personId) {
        availableRoster.splice(i, 1);
        console.log("hit splice")
        break;
      } 
    }

    myRoster.push(allPlayersMap[personId]);

    this.setState({ myRoster, availableRoster });
  }

  removePlayerFromRoster = (personId) => {
    const { allPlayersMap } = this.state;
    let availableRoster = [...this.state.availableRoster];
    let myRoster = [...this.state.myRoster];

    for(let i = 0; i < myRoster.length; i++) {
      if(get(myRoster[i], "personId", "") === personId) {
        myRoster.splice(i, 1);
        break;
      } 
    }

    availableRoster.push(allPlayersMap[personId]);

    this.setState({ myRoster, availableRoster });
  }
 
  render() {
    const { activeScreen, myTeams, availableRoster, myRoster, filter, filteredPlayers, teamCity, teamName, gamePositionsMap } = this.state;

    return (
      <BottomNavigation
      navigationState={{ index: activeScreen, routes }}
      onIndexChange={activeScreen => this.setState({activeScreen})}
      renderScene={
        BottomNavigation.SceneMap({
          myTeams: () => MyTeam({teams: myTeams, onCreateTeam: () => this.setState({activeScreen: 1})}),
          create: () => CreateTeam({availableRoster, myRoster, filter, filteredPlayers, teamCity, teamName, gamePositions: Object.keys(gamePositionsMap), changeText: (text, type) => this.setState({[type]: text}), setFilter: (filter) => this.setState({filter}), addPlayerToRoster: this.addPlayerToRoster, removePlayerFromRoster: this.removePlayerFromRoster, saveTeam: this.saveTeam}),
        })
      }
      style={styles.contentWrapper}
      />
    );
  }
}
 
export default MainScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  }
});