import TokensTransactions from './collection';

TokensTransactions.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
