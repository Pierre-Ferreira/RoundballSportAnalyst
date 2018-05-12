import MonthEndPayments from './collection';

MonthEndPayments.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
});
