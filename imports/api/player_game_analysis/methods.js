import { Meteor } from 'meteor/meteor';
import PlayerGameAnalysis from './collection';
import GamesSetup from '../games_setup/collection';
import './hooks';

Meteor.methods({
  'player_game_analysis.fetch': (gameSetupId) => {
    check(gameSetupId, String)
    if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis not fetched. User not logged in.');
    } else {
      return PlayerGameAnalysis.findOne({ gameSetupId: gameSetupId, userId: Meteor.userId() });
    }
  },
  'player_game_analysis.create': (playerGameAnalysisInfo) => {
    check(playerGameAnalysisInfo, {
      gameSetupId: String,
      playerHostScore: Number,
      playerVisitorScore: Number,
      playerHostTeamGoals: String,
      playerVisitorTeamGoals: String,
      playerHostTeamShots: String,
      playerVisitorTeamShots: String,
      playerHostTeamShotsOnTarget: String,
      playerVisitorTeamShotsOnTarget: String,
      playerHostTeamDropgoals: String,
      playerVisitorTeamDropgoals: String,
      playerHostTeamYellowCards: String,
      playerVisitorTeamYellowCards: String,
      playerHostTeamRedCards: String,
      playerVisitorTeamRedCards: String,
      playerWinner: String,
    });
    if (playerGameAnalysisInfo.gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (playerGameAnalysisInfo.playerHostScore.length === 0) throw new Meteor.Error(403, 'Host Score is required');
    if (playerGameAnalysisInfo.playerVisitorScore.length === 0) throw new Meteor.Error(403, 'Visitor Score is required');
    if (playerGameAnalysisInfo.playerHostTeamGoals.length === 0) throw new Meteor.Error(403, 'Host Goals is required');
    if (playerGameAnalysisInfo.playerVisitorTeamGoals.length === 0) throw new Meteor.Error(403, 'Visitor Goals is required');
    if (playerGameAnalysisInfo.playerHostTeamShots.length === 0) throw new Meteor.Error(403, 'Host Shots is required');
    if (playerGameAnalysisInfo.playerVisitorTeamShots.length === 0) throw new Meteor.Error(403, 'Visitor Shots is required');
    if (playerGameAnalysisInfo.playerHostTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Host ShotsOnTarget is required');
    if (playerGameAnalysisInfo.playerVisitorTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Visitor ShotsOnTarget is required');
    if (playerGameAnalysisInfo.playerHostTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Host Dropgoals is required');
    if (playerGameAnalysisInfo.playerVisitorTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Visitor Dropgoals is required');
    if (playerGameAnalysisInfo.playerHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (playerGameAnalysisInfo.playerVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (playerGameAnalysisInfo.playerHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (playerGameAnalysisInfo.playerVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (playerGameAnalysisInfo.playerWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');

    console.log('playerGameAnalysisInfo.gameSetupId:', playerGameAnalysisInfo.gameSetupId)
    // Get the status of the game to see if it is still open.
    const gameSetupStatus = GamesSetup.findOne({
      _id: playerGameAnalysisInfo.gameSetupId,
    }).gameStatus;
    console.log('gameSetupStatus:', gameSetupStatus)
    // Check if the player has tokens left.
    const totalNoOfTokens = Meteor.users.findOne({ _id: Meteor.userId() }).totalNoOfTokens || 0;
    console.log('totalNoOfTokens:', totalNoOfTokens)
    // Check if there isn't already a GameAnalysis for this player.
    const playerGameAnalyisCount = PlayerGameAnalysis.find({
      gameSetupId: playerGameAnalysisInfo.gameSetupId,
      userId: Meteor.userId(),
    }).count();
    console.log('playerGameAnalyisCount:', playerGameAnalyisCount)
    // Count all the players analysis for this game. Cannot be more than 200.
    const allGameAnalyisCount = PlayerGameAnalysis.find({
      gameSetupId: playerGameAnalysisInfo.gameSetupId,
    }).count();
    console.log('allGameAnalyisCount:', allGameAnalyisCount)
    // Check if the user is logged in.
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. User not logged in.');
    } else if (totalNoOfTokens <= 0) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. You don\'t have any tokens left. PLEASE PURCHASE TOKENS!');
    } else if (gameSetupStatus !== 'open') {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. Game not open anymore.');
    } else if (playerGameAnalyisCount !== 0) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. Player analysis already exists.');
    } else if (allGameAnalyisCount >= 200) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. 200 players already entered game.');
    } else {
      // Update/decrease the user's number of tokens.
      Meteor.users.update({ _id: Meteor.userId() }, { $set: { totalNoOfTokens: totalNoOfTokens - 1 } });
      // Add the userId to the player analysis document.
      playerGameAnalysisInfo.userId = Meteor.userId();
      const PlayerGameAnalysisId = PlayerGameAnalysis.insert(playerGameAnalysisInfo);
      console.log('inserted: ', PlayerGameAnalysis.find(playerGameAnalysisInfo).fetch()[0]);
      return PlayerGameAnalysisId;
    }
  },
});
