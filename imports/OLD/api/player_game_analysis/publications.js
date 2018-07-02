import { Meteor } from 'meteor/meteor';
import PlayerGameAnalysis from './collection';

Meteor.publish('player_game_scores', (gameSetupId) => {
  check(gameSetupId, String);
  const userId = Meteor.userId();
  const playerGameScores = PlayerGameAnalysis.find({ gameSetupId, userId });
  return playerGameScores;
});
Meteor.publish('all_game_scores', (gameSetupId) => {
  check(gameSetupId, String);
  const allGameScores = PlayerGameAnalysis.find({ gameSetupId });
  return allGameScores;
});
Meteor.publish('game_number_of_players', function(gameSetupId) {
  check(gameSetupId, String);
  const gameNumberOfPlayers = PlayerGameAnalysis.find({ gameSetupId });
  return gameNumberOfPlayers;
});
