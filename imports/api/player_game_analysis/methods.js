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
  'player_game_analysis.update': (gameSetupId, gameInfo) => {
    check(gameSetupId, String);
    check(gameInfo, {
      gameSequenceNo: Number,
      gameDate: Date,
      gameKickoff: String,
      gameVenue: String,
      gameCity: String,
      gameHostTeam: String,
      gameHostAlias: String,
      gameVisitorTeam: String,
      gameVisitorAlias: String,
      gameActive: Boolean,
      createdAt: Date,
    });
    if (gameInfo.gameDate.length === 0) throw new Meteor.Error(403, 'Game Date is required');
    if (gameInfo.gameKickoff.length === 0) throw new Meteor.Error(403, 'Kickoff is required');
    if (gameInfo.gameVenue.length === 0) throw new Meteor.Error(403, 'Venue is required');
    if (gameInfo.gameCity.length === 0) throw new Meteor.Error(403, 'City is required');
    if (gameInfo.gameHostTeam.length === 0) throw new Meteor.Error(403, 'Host Team is required');
    if (gameInfo.gameHostAlias.length === 0) throw new Meteor.Error(403, 'Host Alias is required');
    if (gameInfo.gameVisitorTeam.length === 0) throw new Meteor.Error(403, 'Visitor Team is required');
    if (gameInfo.gameVisitorAlias.length === 0) throw new Meteor.Error(403, 'Visitor Alias is required');
    if (gameInfo.gameActive.length === 0) throw new Meteor.Error(403, 'Active is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GamesSetup entry not updated. User not logged in.');
    } else {
      GamesSetup.update({ _id: gameSetupId }, gameInfo);
      console.log('updated: ', GamesSetup.find(gameInfo).fetch()[0]);
    }
  },
});
