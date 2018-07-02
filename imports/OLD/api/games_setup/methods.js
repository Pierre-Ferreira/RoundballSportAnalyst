import { Meteor } from 'meteor/meteor';
import GamesSetup from './collection';
import './hooks';

Meteor.methods({
  'game_setup.fetch': (gameSetupId) => {
    check(gameSetupId, String)
    if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GamesSetup not fetched. User not logged in.');
    } else {
      return GamesSetup.findOne({ _id: gameSetupId });
    }
  },
  'game_setup.create': (gameInfo) => {
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
      gameStatus: String,
      createdAt: Date,
    });
    if (gameInfo.gameSequenceNo.length === 0) throw new Meteor.Error(403, 'Game No is required');
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
      throw new Meteor.Error(403, 'GamesSetup entry not created. User not logged in.');
    } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      throw new Meteor.Error(403, 'GamesSetup entry not created. User is authorized.');
    } else {
      GamesSetup.insert(gameInfo);
      console.log('inserted: ', GamesSetup.find(gameInfo).fetch()[0]);
    }
  },
  'game_setup.update': (gameSetupId, gameInfo) => {
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
      gameStatus: String,
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
    } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      throw new Meteor.Error(403, 'GamesSetup entry not created. User is authorized.');
    } else {
      GamesSetup.update({ _id: gameSetupId }, gameInfo);
      console.log('updated: ', GamesSetup.find(gameInfo).fetch()[0]);
    }
  },
  'game_setup.update_status': (gameSetupId, gameStatus) => {
    check(gameSetupId, String);
    check(gameStatus, String);
    if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup Id is required');
    if (gameStatus.length === 0) throw new Meteor.Error(403, 'Game Status is required');

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'GamesSetup entry not updated. User not logged in.');
    } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      throw new Meteor.Error(403, 'GamesSetup entry not created. User is authorized.');
    } else {
      GamesSetup.update({ _id: gameSetupId }, {$set: { gameStatus }});
      console.log('updated: ', GamesSetup.find(gameInfo).fetch()[0]);
    }
  },
});
