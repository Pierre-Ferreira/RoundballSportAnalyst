import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import GameRunningViewerComp from '../../components/Main/GameRunningViewerComp';
import GameRunningStatistics from '../../../api/game_running_statistics/collection';

const mapTrackerToProps = (state, props) => {
  const { gameSetupId } = props.match.params;
  const handle = Meteor.subscribe('current_game_running_statistics', gameSetupId);
  return {
    loading: !handle.ready(),
    handle,
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
