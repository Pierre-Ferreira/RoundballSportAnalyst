import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import WelcomeComp from '../../components/Main/WelcomeComp';

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
    toLoginPage: () => dispatch(push('/login')),
    saveUserInfoState: userInfo => dispatch({ type: 'SAVE_USER_INFO', userInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(WelcomeComp);
