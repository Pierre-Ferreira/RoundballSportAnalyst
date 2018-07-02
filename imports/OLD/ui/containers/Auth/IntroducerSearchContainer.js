import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import IntroducerSearchComp from '../../components/Auth/IntroducerSearchComp';

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
    saveIntroducerInfoState: introducerInfo => dispatch({ type: 'SAVE_INTRODUCER_INFO', introducerInfo }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(IntroducerSearchComp);
