import { Meteor } from 'meteor/meteor';
import GameRunningStatistics from './collection';

Meteor.publish('current_game_running_statistics', (gameSetupId) => {
  check(gameSetupId, String);
  return GameRunningStatistics.find({ gameSetupId });
});
