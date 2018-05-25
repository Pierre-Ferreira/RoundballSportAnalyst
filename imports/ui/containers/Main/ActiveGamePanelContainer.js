import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import ActiveGamePanelComp from '../../components/Main/ActiveGamePanelComp';
// import GamesSetup from '../../../api/games_setup/collection';
import GameRunningStatistics from '../../../api/game_running_statistics/collection';

const mapTrackerToProps = (state, props) => {
  const gameSetupId = props.gameSetup._id;
  const handle = Meteor.subscribe('current_game_running_isRunning', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
    CurrentGameRunningStatistics: GameRunningStatistics.find({ gameSetupId }).fetch(),
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
