import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import SignupComp from '../../components/Auth/SignupComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  let introducerInfoStr = `${state.IntroducerInfo.firstName} ${state.IntroducerInfo.lastName}`;
  introducerInfoStr += state.IntroducerInfo.clcNo ? ` (${state.IntroducerInfo.clcNo})` : '';
  return {
    introducerInfoStr: (introducerInfoStr.trim().length !== 0) ? introducerInfoStr : null,
    introducerId: state.IntroducerInfo._id,
    email: state.SignupInfo.email,
    username: state.SignupInfo.username,
    firstName: state.SignupInfo.firstName,
    lastName: state.SignupInfo.lastName,
    cellNo: state.SignupInfo.cellNo,
    walletAddress: state.SignupInfo.walletAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveSignupInfoState: signupInfo => dispatch({ type: 'SAVE_SIGNUP_INFO', signupInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(SignupComp);
