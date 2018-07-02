import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import PlayerScoreViewerComp from '../../components/Main/PlayerScoreViewerComp';
import PlayerGameAnalysis from '../../../api/player_game_analysis/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const userId = Meteor.userId();
  const handle = Meteor.subscribe('player_game_scores', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    playerGameScores: PlayerGameAnalysis.find({gameSetupId, userId}).fetch(),
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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(PlayerScoreViewerComp);
