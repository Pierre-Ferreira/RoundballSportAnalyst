import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import AuthenticatedNavigationLinksComp from '../../components/Navbar/AuthenticatedNavigationLinksComp';


const mapTrackerToProps = (state, props) => {
  const handleUserTokensInfo = Meteor.subscribe('user_tokens_info');
  const totalNoOfTokens = Meteor.users.findOne({ _id: Meteor.userId() }).totalNoOfTokens || 0;
  console.log('totalNoOfTokens:', totalNoOfTokens)
  return {
    userIsSuperAdmin: Roles.userIsInRole(Meteor.userId(), 'superadmin'),
    totalNoOfTokens,
  };
};

function mapStateToProps(state) {
  return {
    username: state.UserInfo.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toHomepage: () => dispatch(push('/')),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(AuthenticatedNavigationLinksComp);
