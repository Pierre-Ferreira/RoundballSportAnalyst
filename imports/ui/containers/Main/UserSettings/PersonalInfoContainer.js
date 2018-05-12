import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import PersonalInfoComp from '../../../components/Main/UserSettings/PersonalInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  return {
    userInfo: state.UserInfo,
    // firstName: state.UserPersonalInfo.firstName,
    // lastName: state.UserPersonalInfo.lastName,
    // cellNo: state.UserPersonalInfo.cellNo,
    // clcNo: state.UserInfo.clcNo,
    // username: state.UserInfo.username,
    // joinedDate: moment(state.UserInfo.joinedDate).format('Do MMM YYYY'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toLoginPage: () => dispatch(push('/login')),
    saveUserPersonalInfoState: userPersonalInfo => dispatch({ type: 'SAVE_USER_PERSONAL_INFO', userPersonalInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(PersonalInfoComp);
