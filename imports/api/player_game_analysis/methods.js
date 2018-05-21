import { Meteor } from 'meteor/meteor';
import PlayerGameAnalysis from './collection';
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
      playerHostTeamTries: String,
      playerVisitorTeamTries: String,
      playerHostTeamConvs: String,
      playerVisitorTeamConvs: String,
      playerHostTeamPenalties: String,
      playerVisitorTeamPenalties: String,
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
    if (playerGameAnalysisInfo.playerHostTeamTries.length === 0) throw new Meteor.Error(403, 'Host Tries is required');
    if (playerGameAnalysisInfo.playerVisitorTeamTries.length === 0) throw new Meteor.Error(403, 'Visitor Tries is required');
    if (playerGameAnalysisInfo.playerHostTeamConvs.length === 0) throw new Meteor.Error(403, 'Host Conversions is required');
    if (playerGameAnalysisInfo.playerVisitorTeamConvs.length === 0) throw new Meteor.Error(403, 'Visitor Conversions is required');
    if (playerGameAnalysisInfo.playerHostTeamPenalties.length === 0) throw new Meteor.Error(403, 'Host Penalties is required');
    if (playerGameAnalysisInfo.playerVisitorTeamPenalties.length === 0) throw new Meteor.Error(403, 'Visitor Penalties is required');
    if (playerGameAnalysisInfo.playerHostTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Host Dropgoals is required');
    if (playerGameAnalysisInfo.playerVisitorTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Visitor Dropgoals is required');
    if (playerGameAnalysisInfo.playerHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (playerGameAnalysisInfo.playerVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (playerGameAnalysisInfo.playerHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (playerGameAnalysisInfo.playerVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (playerGameAnalysisInfo.playerWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'PlayerGameAnalysis entry not created. User not logged in.');
    } else {
      playerGameAnalysisInfo.userId = Meteor.userId();
      const PlayerGameAnalysisId = PlayerGameAnalysis.insert(playerGameAnalysisInfo);
      console.log('inserted: ', PlayerGameAnalysis.find(playerGameAnalysisInfo).fetch()[0]);
      return PlayerGameAnalysisId;
    }
  },
});
