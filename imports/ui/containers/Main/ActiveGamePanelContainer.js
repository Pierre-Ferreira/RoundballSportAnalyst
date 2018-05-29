import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import ActiveGamePanelComp from '../../components/Main/ActiveGamePanelComp';
// import GameRunningStatistics from '../../../api/game_running_statistics/collection';
import PlayerGameAnalysis from '../../../api/player_game_analysis/collection';
// import GamesSetup from '../../../api/games_setup/collection';

const mapTrackerToProps = (state, props) => {
  const gameSetupId = props.gameSetup._id;
  // const handleGameSetupInfo = Meteor.subscribe('games_setup_info', gameSetupId);
  // const handleCurrentGameRunningStatistics = Meteor.subscribe('current_game_running_isRunning', gameSetupId);
  const handleGameNumberOfPlayers = Meteor.subscribe('game_number_of_players', gameSetupId);
  return {
    // loading: !handleCurrentGameRunningStatistics.ready(),
    // handleCurrentGameRunningStatistics,
    // GameSetupInfo: GamesSetup.find({ gameSetupId }).fetch(),
    // CurrentGameRunningStatistics: GameRunningStatistics.find({ gameSetupId }).fetch(),
    noOfPlayers: PlayerGameAnalysis.find({ gameSetupId }).count(),
  };
};

function mapStateToProps(state) {
  return {
    userInfo: state.UserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ActiveGamePanelComp);
