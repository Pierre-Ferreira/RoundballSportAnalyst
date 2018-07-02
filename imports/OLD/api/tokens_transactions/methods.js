import { Meteor } from 'meteor/meteor';
import TokensTransactions from './collection';
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
  'token_purchase.create': (noOfTokens, TXID) => {
    check(noOfTokens, Number);
    check(TXID, String);
    if (noOfTokens === 0) throw new Meteor.Error(403, 'No of tokens is required');
    if (TXID.length === 0) throw new Meteor.Error(403, 'TXID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'TokensTransactions entry not created. User not logged in.');
    } else {
      // Check if the TXID already exists.
      const transactionID = TokensTransactions.findOne({ TXID });
      if (transactionID) {
        throw new Meteor.Error(403, 'TokensTransactions entry not created. TXID already used!');
      } else {
        const TokensTransactionsID = TokensTransactions.insert({
          noOfTokens,
          TXID,
          userId: Meteor.userId(),
          amount: noOfTokens * 100,
          createdAt: new Date(),
          approved: false,
        });
        console.log('inserted TokensTransactions: ', TokensTransactions.find({ _id: TokensTransactionsID }).fetch()[0]);
      }
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
