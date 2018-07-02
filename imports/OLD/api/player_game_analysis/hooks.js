import PlayerGameAnalysis from './collection';

PlayerGameAnalysis.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
