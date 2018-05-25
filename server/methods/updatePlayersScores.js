import { Meteor } from 'meteor/meteor';
const atob = require('atob');
const parse = require('csv-parse');
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment/moment';
import PlayerGameAnalysis from '../../imports/api/player_game_analysis/collection';

Meteor.methods({
  updatePlayersScores(gameRunningStatsInfo) {
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
    })
    const { gameSetupId } = gameRunningStatsInfo;
    const scoreFactors = {
      winnerTeam: -1000,
      winnerScore: -20,
      loserScore: -20,
      winnerTries: -50,
      loserTries: -50,
      winnerConvs: -50,
      loserConvs: -50,
      winnerPenalties: -100,
      loserPenalties: -100,
      winnerDropgoals: -150,
      loserDropgoals: -150,
      winnerYellowCards: -150,
      loserYellowCards: -150,
      winnerRedCards: -200,
      loserRedCards: -200,
    };
    const playerGameAnalysisCursor = PlayerGameAnalysis.find({ gameSetupId }).fetch();
    playerGameAnalysisCursor.map((playerGameAnalysis, i) => {
      let playerCategoryDiff = {};
      if (gameRunningStatsInfo.gameWinner === 'HOSTTEAM') {
        playerCategoryDiff = {
          winnerTeam: playerGameAnalysis.playerWinner === 'HOSTTEAM' ? 0 : 1,
          winnerScore: Math.abs(gameRunningStatsInfo.gameHostScore - playerGameAnalysis.playerHostScore),
          winnerTries: Math.abs(gameRunningStatsInfo.gameHostTeamTries - playerGameAnalysis.playerHostTeamTries),
          winnerConvs: Math.abs(gameRunningStatsInfo.gameHostTeamConvs - playerGameAnalysis.playerHostTeamConvs),
          winnerPenalties: Math.abs(gameRunningStatsInfo.gameHostTeamPenalties - playerGameAnalysis.playerHostTeamPenalties),
          winnerDropgoals: Math.abs(gameRunningStatsInfo.gameHostTeamDropgoals - playerGameAnalysis.playerHostTeamDropgoals),
          winnerYellowCards: Math.abs(gameRunningStatsInfo.gameHostTeamYellowCards - playerGameAnalysis.playerHostTeamYellowCards),
          winnerRedCards: Math.abs(gameRunningStatsInfo.gameHostTeamRedCards - playerGameAnalysis.playerHostTeamRedCards),
          loserScore:  Math.abs(gameRunningStatsInfo.gameVisitorScore - playerGameAnalysis.playerVisitorScore),
          loserTries: Math.abs(gameRunningStatsInfo.gameVisitorTeamTries - playerGameAnalysis.playerVisitorTeamTries),
          loserConvs: Math.abs(gameRunningStatsInfo.gameVisitorTeamConvs - playerGameAnalysis.playerVisitorTeamConvs),
          loserPenalties: Math.abs(gameRunningStatsInfo.gameVisitorTeamPenalties - playerGameAnalysis.playerVisitorTeamPenalties),
          loserDropgoals: Math.abs(gameRunningStatsInfo.gameVisitorTeamDropgoals - playerGameAnalysis.playerVisitorTeamDropgoals),
          loserYellowCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamYellowCards - playerGameAnalysis.playerVisitorTeamYellowCards),
          loserRedCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamRedCards - playerGameAnalysis.playerVisitorTeamRedCards),
        };
      } else {
        playerCategoryDiff = {
          winnerTeam: playerGameAnalysis.playerWinner === 'VISITORTEAM' ? 0 : 1,
          winnerScore: Math.abs(gameRunningStatsInfo.gameVisitorScore - playerGameAnalysis.playerVisitorScore),
          winnerTries: Math.abs(gameRunningStatsInfo.gameVisitorTeamTries - playerGameAnalysis.playerVisitorTeamTries),
          winnerConvs: Math.abs(gameRunningStatsInfo.gameVisitorTeamConvs - playerGameAnalysis.playerVisitorTeamConvs),
          winnerPenalties: Math.abs(gameRunningStatsInfo.gameVisitorTeamPenalties - playerGameAnalysis.playerVisitorTeamPenalties),
          winnerDropgoals: Math.abs(gameRunningStatsInfo.gameVisitorTeamDropgoals - playerGameAnalysis.playerVisitorTeamDropgoals),
          winnerYellowCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamYellowCards - playerGameAnalysis.playerVisitorTeamYellowCards),
          winnerRedCards: Math.abs(gameRunningStatsInfo.gameVisitorTeamRedCards - playerGameAnalysis.playerVisitorTeamRedCards),
          loserScore:  Math.abs(gameRunningStatsInfo.gameHostScore - playerGameAnalysis.playerHostScore),
          loserTries: Math.abs(gameRunningStatsInfo.gameHostTeamTries - playerGameAnalysis.playerHostTeamTries),
          loserConvs: Math.abs(gameRunningStatsInfo.gameHostTeamConvs - playerGameAnalysis.playerHostTeamConvs),
          loserPenalties: Math.abs(gameRunningStatsInfo.gameHostTeamPenalties - playerGameAnalysis.playerHostTeamPenalties),
          loserDropgoals: Math.abs(gameRunningStatsInfo.gameHostTeamDropgoals - playerGameAnalysis.playerHostTeamDropgoals),
          loserYellowCards: Math.abs(gameRunningStatsInfo.gameHostTeamYellowCards - playerGameAnalysis.playerHostTeamYellowCards),
          loserRedCards: Math.abs(gameRunningStatsInfo.gameHostTeamRedCards - playerGameAnalysis.playerHostTeamRedCards),
        }
      }
      const playerCategoryLoss = {
        winnerTeam: playerCategoryDiff.winnerTeam * scoreFactors.winnerTeam,
        winnerScore: playerCategoryDiff.winnerScore * scoreFactors.winnerScore,
        winnerTries: playerCategoryDiff.winnerTries * scoreFactors.winnerTries,
        winnerConvs: playerCategoryDiff.winnerConvs * scoreFactors.winnerConvs,
        winnerPenalties: playerCategoryDiff.winnerPenalties * scoreFactors.winnerPenalties,
        winnerDropgoals: playerCategoryDiff.winnerDropgoals * scoreFactors.winnerDropgoals,
        winnerYellowCards: playerCategoryDiff.winnerYellowCards * scoreFactors.winnerYellowCards,
        winnerRedCards: playerCategoryDiff.winnerRedCards * scoreFactors.winnerRedCards,
        loserScore: playerCategoryDiff.loserScore * scoreFactors.loserScore,
        loserTries: playerCategoryDiff.loserTries * scoreFactors.loserTries,
        loserConvs: playerCategoryDiff.loserConvs * scoreFactors.loserConvs,
        loserPenalties: playerCategoryDiff.loserPenalties * scoreFactors.loserPenalties,
        loserDropgoals: playerCategoryDiff.loserDropgoals * scoreFactors.loserDropgoals,
        loserYellowCards: playerCategoryDiff.loserYellowCards * scoreFactors.loserYellowCards,
        loserRedCards: playerCategoryDiff.loserRedCards * scoreFactors.loserRedCards,
      };
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
