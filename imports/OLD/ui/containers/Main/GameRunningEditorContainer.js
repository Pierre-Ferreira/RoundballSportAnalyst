import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import GameRunningEditorComp from '../../components/Main/GameRunningEditorComp';
import GamesSetup from '../../../api/games_setup/collection';
import PlayerGameAnalysis from '../../../api/player_game_analysis/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const handle = Meteor.subscribe('games_setup_list');
  const handleGameNumberOfPlayers = Meteor.subscribe('game_number_of_players', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    noOfPlayers: PlayerGameAnalysis.find({ gameSetupId }).count(),
    GamesSetupList: GamesSetup.find({}, {
      sort: { gameSequenceNo: -1 },
    }).fetch(),
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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(GameRunningEditorComp);
