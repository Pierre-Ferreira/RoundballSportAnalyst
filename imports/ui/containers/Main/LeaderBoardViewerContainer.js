import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import LeaderBoardViewerComp from '../../components/Main/LeaderBoardViewerComp';
import PlayerGameAnalysis from '../../../api/player_game_analysis/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const handle = Meteor.subscribe('all_game_scores', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    allGameScores: PlayerGameAnalysis.find({gameSetupId}, {
      sort: { playerScore: -1 },
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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(LeaderBoardViewerComp);
