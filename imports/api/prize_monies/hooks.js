import PrizeMonies from './collection';

PrizeMonies.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
