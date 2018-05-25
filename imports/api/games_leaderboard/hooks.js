import GamesLeaderboard from './collection';

GamesLeaderboard.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
