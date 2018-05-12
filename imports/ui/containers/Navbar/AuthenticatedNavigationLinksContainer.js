import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import AuthenticatedNavigationLinksComp from '../../components/Navbar/AuthenticatedNavigationLinksComp';

const mapTrackerToProps = (state, props) => {
  return {
    userIsSuperAdmin: Roles.userIsInRole(Meteor.userId(), 'superadmin'),
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
