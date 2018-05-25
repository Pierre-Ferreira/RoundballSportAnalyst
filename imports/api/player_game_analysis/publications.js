import { Meteor } from 'meteor/meteor';
import PlayerGameAnalysis from './collection';

Meteor.publish('player_game_scores', (gameSetupId) => {
  check(gameSetupId, String);
  const userId = Meteor.userId();
  const playerGameScores = PlayerGameAnalysis.find({ gameSetupId, userId });
  return playerGameScores;
});
