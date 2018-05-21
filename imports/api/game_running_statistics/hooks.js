import GameRunningStatistics from './collection';

GameRunningStatistics.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
