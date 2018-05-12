import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import moment from 'moment/moment';
import WalletInfoComp from '../../../components/Main/UserSettings/WalletInfoComp';

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
    saveWalletInfoState: walletInfo => dispatch({ type: 'SAVE_WALLET_INFO', walletInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(WalletInfoComp);
