import React, {Component} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MyTeam from "../components/MyTeams";
import CreateTeam from "../components/CreateTeam";
import { get, isEqual } from "lodash";
import players from "../assets/players.json";
import IconButton from "../components/IconButton";

// (non-screen) Screens
let screens = {
  "create": "Create Team",
  "myTeams": "My Teams"
}

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: screens.myTeams, // Which (not-screen) is currently displayed
      myTeams: [], // Teams user has created
      defaultRoster: [], // A default roster to reset to
      availableRoster: [], // Which players are 'currently selectable' when creating a team
      allPlayersMap: {}, // Map of all players from JSON data
      gamePositionsMap: {}, // Map of all unique positions from players in JSON data

      // Create Team Variables
      teamName: "", // Team name
      teamCity: "", // Team city
      filter: "", // Any applied filter
      filteredPlayers: [], // List of players (based on filter)
      myRoster: [], // User's team roster they are creating
    };
  }

  componentDidMount() {
    let league = get(players, "league", {});
    let leagueTeams = Object.keys(league);
    
    let allPlayersMap = {};
    let availableRoster = [];
    let gamePositionsMap = { "None": true };

    // Map initial JSON data and grab player data
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

    this.setState({ allPlayersMap, availableRoster, gamePositionsMap, filteredPlayers: availableRoster, defaultRoster: availableRoster });
  }

  componentDidUpdate(prevProps, prevState) {
    // Listen for changes (in state) to 'availableRoster' and 'filter'
    if(!isEqual(get(this.state, "availableRoster", {}), get(prevState, "availableRoster"), {}) || !isEqual(get(this.state, "filter", {}), get(prevState, "filter"), {})) {
      const { availableRoster, filter } = this.state;
      let filteredPlayers = [];
  
      // Swap visible player list based on filter
      if(filter && filter !== "None") {
        availableRoster.forEach(player => {
          if(get(player, "teamSitesOnly.posFull", "") === filter) filteredPlayers.push(player);
        })
      } else filteredPlayers = availableRoster;

      this.setState({ filteredPlayers });
    }
  }

  // Saves the user's team
  saveTeam = (team) => {
    const { defaultRoster } = this.state;

    let myTeams = [...this.state.myTeams];
    myTeams.push(team);

    this.setState({myTeams, activeScreen: screens.myTeams, teamName: "", teamCity: "", myRoster: [], filteredPlayers: defaultRoster, availableRoster: defaultRoster, })
  }

  // Adds a player to the user's roster, while removing the player from the 'availableRoster' list. Also checks for duplicate positions.
  addPlayerToRoster = (personId) => {
    const { allPlayersMap } = this.state;
    let availableRoster = [...this.state.availableRoster];
    let myRoster = [...this.state.myRoster];
    let incomingPosition = get(allPlayersMap[personId], "teamSitesOnly.posFull", "");

    for(let i = 0; i < myRoster.length; i++) {
      if(get(myRoster[i], "teamSitesOnly.posFull", "") === incomingPosition) {
        Alert.alert(
          "Position Already Filled",
          `Could not add player to roster, as the ${incomingPosition} position is already filled`,
        );
        return;
      }
    }

    for(let i = 0; i < availableRoster.length; i++) {
      if(get(availableRoster[i], "personId", "") === personId) {
        availableRoster.splice(i, 1);
        break;
      } 
    }

    myRoster.push(allPlayersMap[personId]);

    this.setState({ myRoster, availableRoster });
  }

  // Removes player from user's roster, and adds player back into 'availableRoster' pool
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
    const { activeScreen, myTeams, availableRoster, myRoster, filteredPlayers, gamePositionsMap } = this.state;

    return (
      <View style={styles.contentWrapper}>
        { activeScreen === screens.create ? 
          <CreateTeam availableRoster={availableRoster} myRoster={myRoster} filteredPlayers={filteredPlayers} gamePositions={Object.keys(gamePositionsMap)} addPlayerToRoster={this.addPlayerToRoster} removePlayerFromRoster={this.removePlayerFromRoster} saveTeam={this.saveTeam} setFilter={(filter) => this.setState({filter})} /> : 
          <MyTeam teams={myTeams} onCreateTeam={() => this.setState({activeScreen: screens.create})} /> }
        <View style={styles.footWrapper}>
          <IconButton icon={"minus"} text={"My Teams"} buttonStyle={{borderWidth: 0, borderRadius: 0 }} onPress={() => this.setState({activeScreen: screens.myTeams})} />
          <IconButton icon={"plus"} text={"Create Team"} buttonStyle={{borderWidth: 0, borderRadius: 0 }} onPress={() => this.setState({activeScreen: screens.create})} />
        </View>
      </View>
    );
  }
}
 
export default MainScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  inputStyle: {
    marginBottom: 15,
  },
  footWrapper: {
    flex: 0,
    width: "100%",
    height: 75,
    flexDirection: "row"
  }
});