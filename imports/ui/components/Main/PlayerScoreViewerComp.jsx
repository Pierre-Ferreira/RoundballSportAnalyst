import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerScoreViewerComp.less';

export default class PlayerScoreViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      gameRunningStatsId: '',
      gameHostTeamTries: '0',
      gameVisitorTeamTries: '0',
      gameHostTeamConvs: '0',
      gameVisitorTeamConvs: '0',
      gameHostTeamPenalties: '0',
      gameVisitorTeamPenalties: '0',
      gameHostTeamDropgoals: '0',
      gameVisitorTeamDropgoals: '0',
      gameHostTeamYellowCards: '0',
      gameVisitorTeamYellowCards: '0',
      gameHostTeamRedCards: '0',
      gameVisitorTeamRedCards: '0',
      gameHostScore: 0,
      gameVisitorScore: 0,
    };
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { gameSetupId } = this.props.match.params;
    Meteor.call('player_game_analysis.fetch', gameSetupId, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        if (result) {
          this.setState({
            PlayerGameAnalysisId: result._id,
            playerHostScore: result.playerHostScore,
            playerVisitorScore: result.playerVisitorScore,
            playerHostTeamTries: result.playerHostTeamTries,
            playerVisitorTeamTries: result.playerVisitorTeamTries,
            playerHostTeamConvs: result.playerHostTeamConvs,
            playerVisitorTeamConvs: result.playerVisitorTeamConvs,
            playerHostTeamPenalties: result.playerHostTeamPenalties,
            playerVisitorTeamPenalties: result.playerVisitorTeamPenalties,
            playerHostTeamDropgoals: result.playerHostTeamDropgoals,
            playerVisitorTeamDropgoals: result.playerVisitorTeamDropgoals,
            playerHostTeamYellowCards: result.playerHostTeamYellowCards,
            playerVisitorTeamYellowCards: result.playerVisitorTeamYellowCards,
            playerHostTeamRedCards: result.playerHostTeamRedCards,
            playerVisitorTeamRedCards: result.playerVisitorTeamRedCards,
          });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.gameHostScore !== this.state.gameHostScore ||
      nextProps.gameVisitorScore !== this.state.gameVisitorScore ||
      nextProps.gameHostTeamTries !== this.state.gameHostTeamTries ||
      nextProps.gameHostTeamDropgoals !== this.state.gameHostTeamDropgoals ||
      nextProps.gameHostTeamConvs !== this.state.gameHostTeamConvs ||
      nextProps.gameHostTeamPenalties !== this.state.gameHostTeamPenalties ||
      nextProps.gameVisitorTeamTries !== this.state.gameVisitorTeamTries ||
      nextProps.gameVisitorTeamConvs !== this.state.gameVisitorTeamConvs ||
      nextProps.gameVisitorTeamPenalties !== this.state.gameVisitorTeamPenalties ||
      nextProps.gameVisitorTeamDropgoals !== this.state.gameVisitorTeamDropgoals ||
      nextProps.gameHostTeamYellowCards !== this.state.gameHostTeamYellowCards ||
      nextProps.gameVisitorTeamYellowCards !== this.state.gameVisitorTeamYellowCards ||
      nextProps.gameHostTeamRedCards !== this.state.gameHostTeamRedCards ||
      nextProps.gameVisitorTeamRedCards !== this.state.gameVisitorTeamRedCards
    ) {
      this.setState({
        gameRunningStatsId: nextProps.CurrentGameRunningStatistics[0]._id,
        gameSetupId: nextProps.CurrentGameRunningStatistics[0].gameSetupId,
        gameHostScore: nextProps.CurrentGameRunningStatistics[0].gameHostScore,
        gameVisitorScore: nextProps.CurrentGameRunningStatistics[0].gameVisitorScore,
        gameHostTeamTries: nextProps.CurrentGameRunningStatistics[0].gameHostTeamTries,
        gameVisitorTeamTries: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamTries,
        gameHostTeamConvs: nextProps.CurrentGameRunningStatistics[0].gameHostTeamConvs,
        gameVisitorTeamConvs: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamConvs,
        gameHostTeamPenalties: nextProps.CurrentGameRunningStatistics[0].gameHostTeamPenalties,
        gameVisitorTeamPenalties: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamPenalties,
        gameHostTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameHostTeamDropgoals,
        gameVisitorTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamDropgoals,
        gameHostTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamYellowCards,
        gameVisitorTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamYellowCards,
        gameHostTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamRedCards,
        gameVisitorTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamRedCards,
        gameIsRunning: nextProps.CurrentGameRunningStatistics[0].gameIsRunning,
      });
    }
  }

  close() {
    this.props.history.goBack();
  }

  render() {
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
    // const scoreInitialPoints = {
    //   winnerTeam: 1000,
    //   winnerScore: 1000,
    //   loserScore: 500,
    //   winnerTries: 300,
    //   loserTries: 200,
    //   winnerConvs: 150,
    //   loserConvs: 100,
    //   winnerPenalties: 250,
    //   loserPenalties: 150,
    //   winnerDropgoals: 300,
    //   loserDropgoals: 300,
    //   winnerYellowCards: 100,
    //   loserYellowCards: 100,
    //   winnerRedCards: 200,
    //   loserRedCards: 200,
    // };
    return (
      <div id="player-score-viewer-comp">
        <div className="container player-score-viewer-area">
          <div className="heading-row row justify-content-md-center">
            <div className="col-md-12 game-row8 text-center">Your Score</div>
          </div>
          <div className="heading-section-row row justify-content-md-center">
            <div className="col-md-4 game-row9 text-center">Cat</div>
            <div className="col-md-2 game-row9 text-center">Diff</div>
            <div className="col-md-3 game-row9 text-center">Factor</div>
            <div className="col-md-3 game-row9 text-center">Loss</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerTeam}</div>
            <div className="col-md-3 game-row6 text-center">10</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Score:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerScore}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Score:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserScore}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Tries:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerTries}</div>
            <div className="col-md-3 game-row6 text-center">150</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Tries:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserTries}</div>
            <div className="col-md-3 game-row6 text-center">100</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Convs:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerConvs}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Convs:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserConvs}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Pens:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerPenalties}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Pens:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserPenalties}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner D/goals:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser D/goals:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Yellows:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Yellows:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Reds:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerRedCards}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Reds:</div>
            <div className="col-md-2 game-row6 text-center">2</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserRedCards}</div>
            <div className="col-md-3 game-row6 text-center">40</div>
          </div>
        </div>
      </div>
    );
  }
}
