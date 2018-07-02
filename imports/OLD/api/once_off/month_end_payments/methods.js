import { Meteor } from 'meteor/meteor';
import MonthEndPayments from './collection';
import './hooks';

Meteor.methods({
  'month_end_payment.create': (data) => {
    console.log('INSIDE METHOD');
    if (!Meteor.userId()) {
      console.log('METHOD ERROR');
      throw new Meteor.Error('error', 'Cannot create a new MonthEndPayments entry.', {
        why: 'User not logged in',
      });
    } else {
      console.log('METHOD SUCCESS');
      MonthEndPayments.insert(data);
      console.log('inserted: ', MonthEndPayments.find(data).fetch()[0]);
    }
  },
});
