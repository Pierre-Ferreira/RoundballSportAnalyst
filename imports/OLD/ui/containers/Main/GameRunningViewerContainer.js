import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import GameRunningViewerComp from '../../components/Main/GameRunningViewerComp';
import GameRunningStatistics from '../../../api/game_running_statistics/collection';
import PlayerGameAnalysis from '../../../api/player_game_analysis/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const handle = Meteor.subscribe('current_game_running_statistics', gameSetupId);
  const handleGameNumberOfPlayers = Meteor.subscribe('game_number_of_players', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    noOfPlayers: PlayerGameAnalysis.find({ gameSetupId }).count(),
    CurrentGameRunningStatistics: GameRunningStatistics.find({ gameSetupId }).fetch(),
  };
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(GameRunningViewerComp);
