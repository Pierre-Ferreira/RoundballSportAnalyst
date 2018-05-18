import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import ActiveGamePanelComp from '../../components/Main/ActiveGamePanelComp';
// import GamesSetup from '../../../api/games_setup/collection';

const mapTrackerToProps = (state, props) => {
  return {
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
