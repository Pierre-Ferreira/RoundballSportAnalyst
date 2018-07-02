import { Meteor } from 'meteor/meteor';
import GamesSetup from './collection';

// Return the specified month end payments.
Meteor.publish('games_setup_list', () => {
  return GamesSetup.find({});
});
Meteor.publish('games_setup_info', (gameSetupId) => {
  return GamesSetup.find({ _id: gameSetupId });
});
Meteor.publish('2games_setup_list_active', () => {
  return GamesSetup.find({ gameActive: true });
});
