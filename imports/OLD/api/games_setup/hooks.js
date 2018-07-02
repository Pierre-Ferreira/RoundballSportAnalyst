import GamesSetup from './collection';

GamesSetup.before.insert((userId, doc) => {
  doc.createdAt = new Date();
});
