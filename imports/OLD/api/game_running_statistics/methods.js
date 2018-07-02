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
      gameHostTeamGoals: String,
      gameVisitorTeamGoals: String,
      gameHostTeamShots: String,
      gameVisitorTeamShots: String,
      gameHostTeamShotsOnTarget: String,
      gameVisitorTeamShotsOnTarget: String,
      gameHostTeamCorners: String,
      gameVisitorTeamCorners: String,
      gameHostTeamYellowCards: String,
      gameVisitorTeamYellowCards: String,
      gameHostTeamRedCards: String,
      gameVisitorTeamRedCards: String,
      gameWinner: String,
    });
    if (gameRunningStatsInfo.gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (gameRunningStatsInfo.gameHostScore.length === 0) throw new Meteor.Error(403, 'Host Score is required');
    if (gameRunningStatsInfo.gameVisitorScore.length === 0) throw new Meteor.Error(403, 'Visitor Score is required');
    if (gameRunningStatsInfo.gameHostTeamGoals.length === 0) throw new Meteor.Error(403, 'Host Goals is required');
    if (gameRunningStatsInfo.gameVisitorTeamGoals.length === 0) throw new Meteor.Error(403, 'Visitor Goals is required');
    if (gameRunningStatsInfo.gameHostTeamShots.length === 0) throw new Meteor.Error(403, 'Host Shots is required');
    if (gameRunningStatsInfo.gameVisitorTeamShots.length === 0) throw new Meteor.Error(403, 'Visitor Shots is required');
    if (gameRunningStatsInfo.gameHostTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Host ShotsOnTarget is required');
    if (gameRunningStatsInfo.gameVisitorTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Visitor ShotsOnTarget is required');
    if (gameRunningStatsInfo.gameHostTeamCorners.length === 0) throw new Meteor.Error(403, 'Host Corners is required');
    if (gameRunningStatsInfo.gameVisitorTeamCorners.length === 0) throw new Meteor.Error(403, 'Visitor Corners is required');
    if (gameRunningStatsInfo.gameHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (gameRunningStatsInfo.gameHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (gameRunningStatsInfo.gameWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not created. User not logged in.');
    } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not created. User is authorized.');
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
      gameHostTeamGoals: String,
      gameVisitorTeamGoals: String,
      gameHostTeamShots: String,
      gameVisitorTeamShots: String,
      gameHostTeamShotsOnTarget: String,
      gameVisitorTeamShotsOnTarget: String,
      gameHostTeamCorners: String,
      gameVisitorTeamCorners: String,
      gameHostTeamYellowCards: String,
      gameVisitorTeamYellowCards: String,
      gameHostTeamRedCards: String,
      gameVisitorTeamRedCards: String,
      gameWinner: String,
    });
    // if (gameRunningStatsInfo.gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (gameRunningStatsInfo.gameHostScore.length === 0) throw new Meteor.Error(403, 'Host Score is required');
    if (gameRunningStatsInfo.gameVisitorScore.length === 0) throw new Meteor.Error(403, 'Visitor Score is required');
    if (gameRunningStatsInfo.gameHostTeamGoals.length === 0) throw new Meteor.Error(403, 'Host Goals is required');
    if (gameRunningStatsInfo.gameVisitorTeamGoals.length === 0) throw new Meteor.Error(403, 'Visitor Goals is required');
    if (gameRunningStatsInfo.gameHostTeamShots.length === 0) throw new Meteor.Error(403, 'Host Shots is required');
    if (gameRunningStatsInfo.gameVisitorTeamShots.length === 0) throw new Meteor.Error(403, 'Visitor Shots is required');
    if (gameRunningStatsInfo.gameHostTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Host ShotsOnTarget is required');
    if (gameRunningStatsInfo.gameVisitorTeamShotsOnTarget.length === 0) throw new Meteor.Error(403, 'Visitor ShotsOnTarget is required');
    if (gameRunningStatsInfo.gameHostTeamCorners.length === 0) throw new Meteor.Error(403, 'Host Corners is required');
    if (gameRunningStatsInfo.gameVisitorTeamCorners.length === 0) throw new Meteor.Error(403, 'Visitor Corners is required');
    if (gameRunningStatsInfo.gameHostTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Host Yellow Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamYellowCards.length === 0) throw new Meteor.Error(403, 'Visitor Yellow Cards No is required');
    if (gameRunningStatsInfo.gameHostTeamRedCards.length === 0) throw new Meteor.Error(403, 'Host Red Cards is required');
    if (gameRunningStatsInfo.gameVisitorTeamRedCards.length === 0) throw new Meteor.Error(403, 'Visitor Red Cards is required');
    if (gameRunningStatsInfo.gameWinner.length === 0) throw new Meteor.Error(403, 'Game Winner is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not updated. User not logged in.');
    } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      throw new Meteor.Error(403, 'GameRunningStatistics entry not updated. User is authorized.');
    } else {
      GameRunningStatistics.update({ _id: gameRunningStatsId }, gameRunningStatsInfo);
      console.log('Updated game_running_statistics: ', GameRunningStatistics.find(gameRunningStatsInfo).fetch()[0]);
    }
  },
});
