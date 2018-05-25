import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import LeaderBoardViewerComp from '../../components/Main/LeaderBoardViewerComp';
import GamesLeaderboard from '../../../api/games_leaderboard/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const handle = Meteor.subscribe('leaderboard_info', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    gameLeaderboardInfo: GamesLeaderboard.find({ gameSetupId }).fetch(),
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
