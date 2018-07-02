import { Meteor } from 'meteor/meteor';
import GamesLeaderboard from './collection';

// Return the specified month end payments.
Meteor.publish('leaderboard_info', (gameSetupId) => {
  check(gameSetupId, String)
  const leaderboardInfo = GamesLeaderboard.find({ gameSetupId });
  return leaderboardInfo;
});
