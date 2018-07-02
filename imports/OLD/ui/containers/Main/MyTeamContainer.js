import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import MyTeamComp from '../../components/Main/MyTeamComp';

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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(MyTeamComp);
