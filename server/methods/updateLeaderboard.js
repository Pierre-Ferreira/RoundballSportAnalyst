import { Meteor } from 'meteor/meteor';
import PlayerGameAnalysis from '../../imports/api/player_game_analysis/collection';
Meteor.methods({
  updateLeaderboard(gameSetupId) {
    check(gameSetupId, String);
    if (gameSetupId.length === 0) throw new Meteor.Error(403, 'Game Setup ID is required');
    const allGamePlayersAnalysis = PlayerGameAnalysis.find({gameSetupId}, {
      sort: { playerScore: -1 },
    }).fetch();
    const gameLeaderboard = allGamePlayersAnalysis.map((playerGameAnalysisDocument, i) => {
      const { username } = Meteor.users.findOne({ _id: playerGameAnalysisDocument.userId });
      console.log('playerGameAnalysisDocument.userId:', playerGameAnalysisDocument.userId);
      console.log('username:', username);
      const returnObj = {
        playerGameAnalysisId: playerGameAnalysisDocument._id,
        userId: playerGameAnalysisDocument.userId,
        username,
        playerScore: playerGameAnalysisDocument.playerScore,
        position: i + 1,
      };
      return returnObj;
    });
    console.log('gameLeaderboard:', gameLeaderboard);
    return gameLeaderboard
  },
});
