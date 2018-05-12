import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import blockchainAPIPaymentsComp from '../../components/Admin/blockchainAPIPaymentsComp';
import MonthEndPayments from '../../../api/once_off/month_end_payments/collection';


const mapTrackerToProps = (state, props) => {
  const handle = Meteor.subscribe('month_end_payments');
  return {
    loading: !handle.ready(),
    MonthEndPayments: MonthEndPayments.find({}, {
      sort: { TXCompleted: -1 },
    }).fetch(),
  };
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(blockchainAPIPaymentsComp);
