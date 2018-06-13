import { Meteor } from 'meteor/meteor';
import ContactUsMessages from './collection';
import './hooks';

Meteor.methods({
  // 'game_leaderboard.fetch': (gameSetupId) => {
  //   check(gameSetupId, String)
  //   if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game ID is required');
  //   if (!Meteor.userId()) {
  //     throw new Meteor.Error(403, 'TokensTransactions not fetched. User not logged in.');
  //   } else {
  //     const GamesLeaderboardCursor = GamesLeaderboard.find({ gameSetupId }).fetch();
  //     console.log('gameSetupId:', gameSetupId);
  //     console.log('GamesLeaderboardCursor:', GamesLeaderboardCursor);
  //     if (GamesLeaderboardCursor.length > 1) {
  //       throw new Meteor.Error(403, 'More than one GamesLeaderboard documents found.');
  //     } else if (GamesLeaderboardCursor.length === 0) {
  //       return null;
  //     } else {
  //       return GamesLeaderboardCursor[0];
  //     }
  //   }
  // },
  'contact_us_messages.create': (category, message) => {
    check(category, String);
    check(message, String);
    if (category.length === 0) throw new Meteor.Error(403, 'Category is required');
    if (message.length === 0) throw new Meteor.Error(403, 'Message is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'ContactUsMessages entry not created. User not logged in.');
    } else {
      const ContactUsMessagesID = ContactUsMessages.insert({
        userId: Meteor.userId(),
        category,
        message,
      });
      Email.send({
        to: 'pierre@tektite.biz',
        from: Meteor.user().emails[0].address,
        subject: category,
        text: `${Meteor.userId()}: ${message}`,
      });
      console.log('inserted ContactUsMessages: ', ContactUsMessages.find({ _id: ContactUsMessagesID }).fetch()[0]);
    }
  },
  // 'game_leaderboard.update': (gameSetupId, gameLeaderboard) => {
  //   check(gameSetupId, String);
  //   check(gameLeaderboard, [{
  //     playerGameAnalysisId: String,
  //     userId: String,
  //     username: String,
  //     playerScore: Number,
  //     position: Number,
  //   }]);
  //   if (!Meteor.userId()) {
  //     throw new Meteor.Error(403, 'GamesLeaderboard entry not updated. User not logged in.');
  //   } else if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
  //     throw new Meteor.Error(403, 'GamesLeaderboard entry not created. User is authorized.')
  //   } else {
  //     GamesLeaderboard.update(
  //       { gameSetupId },
  //       {
  //         $set: {
  //           gameLeaderboard,
  //           updatedAt: new Date(),
  //         },
  //       },
  //     );
  //     console.log('updated GamesLeaderboard: ', GamesLeaderboard.find({ gameSetupId }).fetch()[0]);
  //   }
  // },
});
