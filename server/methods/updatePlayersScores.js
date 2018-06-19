import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment/moment';
import PlayerGameAnalysis from '../../imports/api/player_game_analysis/collection';

Meteor.methods({
  updatePlayersScores(gameRunningStatsInfo) {
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
      gameHostAlias: String,
      gameVisitorAlias: String,
    });
    const { gameSetupId } = gameRunningStatsInfo;
    const scoreFactors = {
      winnerTeam: -3000,
      winnerGoals: -500,
      loserGoals: -500,
      winnerShots: -50,
      loserShots: -50,
      winnerShotsOnTarget: -100,
      loserShotsOnTarget: -100,
      winnerCorners: -150,
      loserCorners: -150,
      winnerYellowCards: -300,
      loserYellowCards: -300,
      winnerRedCards: -400,
      loserRedCards: -400,
    };
    const playerGameAnalysisCursor = PlayerGameAnalysis.find({ gameSetupId }).fetch();
    playerGameAnalysisCursor.map((playerGameAnalysis) => {
      let playerCategoryDiff = {};
      console.log('gameHostAlias:', gameRunningStatsInfo.gameHostAlias)
      console.log('gameVisitorAlias:', gameRunningStatsInfo.gameVisitorAlias)
      if (gameRunningStatsInfo.gameWinner === 'HOSTTEAM') {
        playerCategoryDiff = {
          winnerTeam: playerGameAnalysis.playerWinner === 'HOSTTEAM' ? 0 : 1,
          winnerAlias: gameRunningStatsInfo.gameHostAlias,
          winnerGoals: Math.abs(gameRunningStatsInfo.gameHostTeamGoals - playerGameAnalysis.playerHostTeamGoals),
          winnerShots: Math.abs(gameRunningStatsInfo.gameHostTeamShots - playerGameAnalysis.playerHostTeamShots),
          winnerShotsOnTarget: Math.abs(gameRunningStatsInfo.gameHostTeamShotsOnTarget - playerGameAnalysis.playerHostTeamShotsOnTarget),
          winnerCorners: Math.abs(gameRunningStatsInfo.gameHostTeamCorners - playerGameAnalysis.playerHostTeamCorners),
          winnerYellowCards: Math.abs(gameRunningStatsInfo.gameHostTeamYellowCards - playerGameAnalysis.playerHostTeamYellowCards),
          winnerRedCards: Math.abs(gameRunningStatsInfo.gameHostTeamRedCards - playerGameAnalysis.playerHostTeamRedCards),
          loserAlias: gameRunningStatsInfo.gameVisitorAlias,
          loserGoals: Math.abs(gameRunningStatsInfo.gameVisitorTeamGoals - playerGameAnalysis.playerVisitorTeamGoals),
          loserShots: Math.abs(gameRunningStatsInfo.gameVisitorTeamShots - playerGameAnalysis.playerVisitorTeamShots),
          loserShotsOnTarget: Math.abs(gameRunningStatsInfo.gameVisitorTeamShotsOnTarget - playerGameAnalysis.playerVisitorTeamShotsOnTarget),
          loserCorners: Math.abs(gameRunningStatsInfo.gameVisitorTeamCorners - playerGameAnalysis.playerVisitorTeamCorners),
          loserYellowCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamYellowCards - playerGameAnalysis.playerVisitorTeamYellowCards),
          loserRedCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamRedCards - playerGameAnalysis.playerVisitorTeamRedCards),
        };
      } else if ((gameRunningStatsInfo.gameWinner === 'VISITORTEAM')) {
        playerCategoryDiff = {
          winnerTeam: playerGameAnalysis.playerWinner === 'VISITORTEAM' ? 0 : 1,
          winnerAlias: gameRunningStatsInfo.gameVisitorAlias,
          winnerGoals: Math.abs(gameRunningStatsInfo.gameVisitorTeamGoals - playerGameAnalysis.playerVisitorTeamGoals),
          winnerShots: Math.abs(gameRunningStatsInfo.gameVisitorTeamShots - playerGameAnalysis.playerVisitorTeamShots),
          winnerShotsOnTarget: Math.abs(gameRunningStatsInfo.gameVisitorTeamShotsOnTarget - playerGameAnalysis.playerVisitorTeamShotsOnTarget),
          winnerCorners: Math.abs(gameRunningStatsInfo.gameVisitorTeamCorners - playerGameAnalysis.playerVisitorTeamCorners),
          winnerYellowCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamYellowCards - playerGameAnalysis.playerVisitorTeamYellowCards),
          winnerRedCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamRedCards - playerGameAnalysis.playerVisitorTeamRedCards),
          loserAlias: gameRunningStatsInfo.gameHostAlias,
          loserGoals: Math.abs(gameRunningStatsInfo.gameHostTeamGoals - playerGameAnalysis.playerHostTeamGoals),
          loserShots: Math.abs(gameRunningStatsInfo.gameHostTeamShots - playerGameAnalysis.playerHostTeamShots),
          loserShotsOnTarget: Math.abs(gameRunningStatsInfo.gameHostTeamShotsOnTarget - playerGameAnalysis.playerHostTeamShotsOnTarget),
          loserCorners: Math.abs(gameRunningStatsInfo.gameHostTeamCorners - playerGameAnalysis.playerHostTeamCorners),
          loserYellowCards: Math.abs(gameRunningStatsInfo.gameHostTeamYellowCards - playerGameAnalysis.playerHostTeamYellowCards),
          loserRedCards: Math.abs(gameRunningStatsInfo.gameHostTeamRedCards - playerGameAnalysis.playerHostTeamRedCards),
        }
      } else {
        playerCategoryDiff = {
          winnerTeam: playerGameAnalysis.playerWinner === 'DRAW' ? 0 : 1,
          winnerAlias: gameRunningStatsInfo.gameVisitorAlias,
          winnerGoals: Math.abs(gameRunningStatsInfo.gameVisitorTeamGoals - playerGameAnalysis.playerVisitorTeamGoals),
          winnerShots: Math.abs(gameRunningStatsInfo.gameVisitorTeamShots - playerGameAnalysis.playerVisitorTeamShots),
          winnerShotsOnTarget: Math.abs(gameRunningStatsInfo.gameVisitorTeamShotsOnTarget - playerGameAnalysis.playerVisitorTeamShotsOnTarget),
          winnerCorners: Math.abs(gameRunningStatsInfo.gameVisitorTeamCorners - playerGameAnalysis.playerVisitorTeamCorners),
          winnerYellowCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamYellowCards - playerGameAnalysis.playerVisitorTeamYellowCards),
          winnerRedCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamRedCards - playerGameAnalysis.playerVisitorTeamRedCards),
          loserAlias: gameRunningStatsInfo.gameHostAlias,
          loserGoals: Math.abs(gameRunningStatsInfo.gameHostTeamGoals - playerGameAnalysis.playerHostTeamGoals),
          loserShots: Math.abs(gameRunningStatsInfo.gameHostTeamShots - playerGameAnalysis.playerHostTeamShots),
          loserShotsOnTarget: Math.abs(gameRunningStatsInfo.gameHostTeamShotsOnTarget - playerGameAnalysis.playerHostTeamShotsOnTarget),
          loserCorners: Math.abs(gameRunningStatsInfo.gameHostTeamCorners - playerGameAnalysis.playerHostTeamCorners),
          loserYellowCards: Math.abs(gameRunningStatsInfo.gameHostTeamYellowCards - playerGameAnalysis.playerHostTeamYellowCards),
          loserRedCards: Math.abs(gameRunningStatsInfo.gameHostTeamRedCards - playerGameAnalysis.playerHostTeamRedCards),
        }
      }
      const playerCategoryLoss = {
        winnerTeam: playerCategoryDiff.winnerTeam * scoreFactors.winnerTeam,
        winnerGoals: playerCategoryDiff.winnerGoals * scoreFactors.winnerGoals,
        winnerShots: playerCategoryDiff.winnerShots * scoreFactors.winnerShots,
        winnerShotsOnTarget: playerCategoryDiff.winnerShotsOnTarget * scoreFactors.winnerShotsOnTarget,
        winnerCorners: playerCategoryDiff.winnerCorners * scoreFactors.winnerCorners,
        winnerYellowCards: playerCategoryDiff.winnerYellowCards * scoreFactors.winnerYellowCards,
        winnerRedCards: playerCategoryDiff.winnerRedCards * scoreFactors.winnerRedCards,
        loserGoals: playerCategoryDiff.loserGoals * scoreFactors.loserGoals,
        loserShots: playerCategoryDiff.loserShots * scoreFactors.loserShots,
        loserShotsOnTarget: playerCategoryDiff.loserShotsOnTarget * scoreFactors.loserShotsOnTarget,
        loserCorners: playerCategoryDiff.loserCorners * scoreFactors.loserCorners,
        loserYellowCards: playerCategoryDiff.loserYellowCards * scoreFactors.loserYellowCards,
        loserRedCards: playerCategoryDiff.loserRedCards * scoreFactors.loserRedCards,
      };
      console.log('playerCategoryDiff:', playerCategoryDiff);
      const playerScoreTotalLoss = Object.values(playerCategoryLoss).reduce((a, b) => {
        return a + b;
      }, 0);
      const playerGameAnalysisNew = {
        ...playerGameAnalysis,
        playerCategoryDiff,
        playerCategoryLoss,
        playerScoreTotalLoss,
        playerScore: 10000 + playerScoreTotalLoss,
      };
      PlayerGameAnalysis.update({ _id: playerGameAnalysis._id }, playerGameAnalysisNew );
    });
  },
});
