import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import moment from 'moment/moment';
import EmailInfoComp from '../../../components/Main/UserSettings/EmailInfoComp';

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
    saveEmailInfoState: emailInfo => dispatch({ type: 'SAVE_EMAIL_INFO', emailInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(EmailInfoComp);
