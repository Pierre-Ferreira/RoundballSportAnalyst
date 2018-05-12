import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import AppComp from '../../components/Layout/AppComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toLoginPage: () => dispatch(push('/auth/login')),
  };
}

export default withRouter(connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(AppComp));
