import { Meteor } from 'meteor/meteor';
import MonthEndPayments from './collection';


// Return the specified month end payments.
Meteor.publish('month_end_payments', () => {
  const dateString = new Date('01-01-2018');
  dateString.setHours(0, 0, 0, 0);
  const MEP = MonthEndPayments.find({ TXCompleted: { $gte: dateString } });
  return MEP;
});
