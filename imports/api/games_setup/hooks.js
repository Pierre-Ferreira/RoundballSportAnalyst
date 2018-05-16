import GamesSetup from './collection';

GamesSetup.before.insert((userId, doc) => {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});
GamesSetup.before.update((userId, doc) => {
  doc.updatedAt = Date.now();
});
