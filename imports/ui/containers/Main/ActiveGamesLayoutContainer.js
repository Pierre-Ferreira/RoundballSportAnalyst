import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import ActiveGamesLayoutComp from '../../components/Main/ActiveGamesLayoutComp';
import GamesSetup from '../../../api/games_setup/collection';

const mapTrackerToProps = (state, props) => {
  const handle = Meteor.subscribe('2games_setup_list_active');
  return {
    loading: !handle.ready(),
    ActiveGamesSetupList: GamesSetup.find({ gameActive: true }, {
      sort: { gameSequenceNo: 1 },
    }).fetch(),
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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ActiveGamesLayoutComp);
