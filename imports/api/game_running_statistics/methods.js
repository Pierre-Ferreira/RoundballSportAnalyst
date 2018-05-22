import { Meteor } from 'meteor/meteor';
import GameRunningStatistics from './collection';
import './hooks';

Meteor.methods({
  'game_running_statistics.fetch': (gameSetupId) => {
    check(gameSetupId, String)
    if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GameRunningStatistics not fetched. User not logged in.');
    } else {
      return GameRunningStatistics.findOne({ gameSetupId });
    }
  },
  'game_running_statistics.create': (gameRunningStatsInfo) => {
    check(gameRunningStatsInfo, {
      gameSetupId: String,
      gameHostScore: Number,
      gameVisitorScore: Number,
      gameHostTeamTries: String,
      gameVisitorTeamTries: String,
      gameHostTeamConvs: String,
      gameVisitorTeamConvs: String,
      gameHostTeamPenalties: String,
      gameVisitorTeamPenalties: String,
      gameHostTeamDropgoals: String,
      gameVisitorTeamDropgoals: String,
      gameHostTeamYellowCards: String,
      gameVisitorTeamYellowCards: String,
      gameHostTeamRedCards: String,
      gameVisitorTeamRedCards: String,
      gameWinner: String,
      gameIsRunning: Boolean,
    });
    if (gameRunningStatsInfo.gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (gameRunningStatsInfo.gameHostScore.length === 0) throw new Meteor.Error(403, 'Host Score is required');
    if (gameRunningStatsInfo.gameVisitorScore.length === 0) throw new Meteor.Error(403, 'Visitor Score is required');
    if (gameRunningStatsInfo.gameHostTeamTries.length === 0) throw new Meteor.Error(403, 'Host Tries is required');
    if (gameRunningStatsInfo.gameVisitorTeamTries.length === 0) throw new Meteor.Error(403, 'Visitor Tries is required');
    if (gameRunningStatsInfo.gameHostTeamConvs.length === 0) throw new Meteor.Error(403, 'Host Conversions is required');
    if (gameRunningStatsInfo.gameVisitorTeamConvs.length === 0) throw new Meteor.Error(403, 'Visitor Conversions is required');
    if (gameRunningStatsInfo.gameHostTeamPenalties.length === 0) throw new Meteor.Error(403, 'Host Penalties is required');
    if (gameRunningStatsInfo.gameVisitorTeamPenalties.length === 0) throw new Meteor.Error(403, 'Visitor Penalties is required');
    if (gameRunningStatsInfo.gameHostTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Host Dropgoals is required');
    if (gameRunningStatsInfo.gameVisitorTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Visitor Dropgoals is required');
    if (gameRunningStatsInfo.gameHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (gameRunningStatsInfo.gameHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (gameRunningStatsInfo.gameWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not created. User not logged in.');
    } else {
      const GameRunningStatisticsId = GameRunningStatistics.insert(gameRunningStatsInfo);
      console.log('Inserted game_running_statistics: ', GameRunningStatistics.find(gameRunningStatsInfo).fetch()[0]);
      return GameRunningStatisticsId;
    }
  },
  'game_running_statistics.update': (gameRunningStatsId, gameRunningStatsInfo) => {
    check(gameRunningStatsId, String);
    check(gameRunningStatsInfo, {
      gameSetupId: String,
      gameHostScore: Number,
      gameVisitorScore: Number,
      gameHostTeamTries: String,
      gameVisitorTeamTries: String,
      gameHostTeamConvs: String,
      gameVisitorTeamConvs: String,
      gameHostTeamPenalties: String,
      gameVisitorTeamPenalties: String,
      gameHostTeamDropgoals: String,
      gameVisitorTeamDropgoals: String,
      gameHostTeamYellowCards: String,
      gameVisitorTeamYellowCards: String,
      gameHostTeamRedCards: String,
      gameVisitorTeamRedCards: String,
      gameWinner: String,
      gameIsRunning: Boolean,
    });
    // if (gameRunningStatsInfo.gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (gameRunningStatsInfo.gameHostScore.length === 0) throw new Meteor.Error(403, 'Host Score is required');
    if (gameRunningStatsInfo.gameVisitorScore.length === 0) throw new Meteor.Error(403, 'Visitor Score is required');
    if (gameRunningStatsInfo.gameHostTeamTries.length === 0) throw new Meteor.Error(403, 'Host Tries is required');
    if (gameRunningStatsInfo.gameVisitorTeamTries.length === 0) throw new Meteor.Error(403, 'Visitor Tries is required');
    if (gameRunningStatsInfo.gameHostTeamConvs.length === 0) throw new Meteor.Error(403, 'Host Conversions is required');
    if (gameRunningStatsInfo.gameVisitorTeamConvs.length === 0) throw new Meteor.Error(403, 'Visitor Conversions is required');
    if (gameRunningStatsInfo.gameHostTeamPenalties.length === 0) throw new Meteor.Error(403, 'Host Penalties is required');
    if (gameRunningStatsInfo.gameVisitorTeamPenalties.length === 0) throw new Meteor.Error(403, 'Visitor Penalties is required');
    if (gameRunningStatsInfo.gameHostTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Host Dropgoals is required');
    if (gameRunningStatsInfo.gameVisitorTeamDropgoals.length === 0) throw new Meteor.Error(403, 'Visitor Dropgoals is required');
    if (gameRunningStatsInfo.gameHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (gameRunningStatsInfo.gameHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (gameRunningStatsInfo.gameWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not updated. User not logged in.');
    } else {
      GameRunningStatistics.update({ _id: gameRunningStatsId }, gameRunningStatsInfo );
      console.log('Updated game_running_statistics: ', GameRunningStatistics.find(gameRunningStatsInfo).fetch()[0]);
    }
  },
});
