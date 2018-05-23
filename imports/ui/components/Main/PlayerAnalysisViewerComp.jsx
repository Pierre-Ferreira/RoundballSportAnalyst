import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerAnalysisViewerComp.less';

export default class PlayerAnalysisViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      PlayerGameAnalysisId: '',
      playerHostTeamTries: '0',
      playerVisitorTeamTries: '0',
      playerHostTeamConvs: '0',
      playerVisitorTeamConvs: '0',
      playerHostTeamPenalties: '0',
      playerVisitorTeamPenalties: '0',
      playerHostTeamDropgoals: '0',
      playerVisitorTeamDropgoals: '0',
      playerHostTeamYellowCards: '0',
      playerVisitorTeamYellowCards: '0',
      playerHostTeamRedCards: '0',
      playerVisitorTeamRedCards: '0',
      playerHostScore: 0,
      playerVisitorScore: 0,
    };
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { gameSetupId } = this.props.match.params;
    Meteor.call('game_setup.fetch', gameSetupId, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        this.setState({
          gameSetupInfo: result,
        });
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
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.gameHostScore !== this.state.gameHostScore ||
  //     nextProps.gameVisitorScore !== this.state.gameVisitorScore ||
  //     nextProps.gameHostScore !== this.state.gameHostScore ||
  //     nextProps.gameVisitorScore !== this.state.gameVisitorScore ||
  //     nextProps.gameHostTeamTries !== this.state.gameHostTeamTries ||
  //     nextProps.gameHostTeamDropgoals !== this.state.gameHostTeamDropgoals ||
  //     nextProps.gameHostTeamConvs !== this.state.gameHostTeamConvs ||
  //     nextProps.gameHostTeamPenalties !== this.state.gameHostTeamPenalties ||
  //     nextProps.gameVisitorTeamTries !== this.state.gameVisitorTeamTries ||
  //     nextProps.gameVisitorTeamConvs !== this.state.gameVisitorTeamConvs ||
  //     nextProps.gameVisitorTeamPenalties !== this.state.gameVisitorTeamPenalties ||
  //     nextProps.gameVisitorTeamDropgoals !== this.state.gameVisitorTeamDropgoals ||
  //     nextProps.gameHostTeamYellowCards !== this.state.gameHostTeamYellowCards ||
  //     nextProps.gameVisitorTeamYellowCards !== this.state.gameVisitorTeamYellowCards ||
  //     nextProps.gameHostTeamRedCards !== this.state.gameHostTeamRedCards ||
  //     nextProps.gameVisitorTeamRedCards !== this.state.gameVisitorTeamRedCards
  //   ) {
  //     this.setState({
  //       gameRunningStatsId: nextProps.CurrentGameRunningStatistics[0]._id,
  //       gameSetupId: nextProps.CurrentGameRunningStatistics[0].gameSetupId,
  //       gameHostScore: nextProps.CurrentGameRunningStatistics[0].gameHostScore,
  //       gameVisitorScore: nextProps.CurrentGameRunningStatistics[0].gameVisitorScore,
  //       gameHostTeamTries: nextProps.CurrentGameRunningStatistics[0].gameHostTeamTries,
  //       gameVisitorTeamTries: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamTries,
  //       gameHostTeamConvs: nextProps.CurrentGameRunningStatistics[0].gameHostTeamConvs,
  //       gameVisitorTeamConvs: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamConvs,
  //       gameHostTeamPenalties: nextProps.CurrentGameRunningStatistics[0].gameHostTeamPenalties,
  //       gameVisitorTeamPenalties: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamPenalties,
  //       gameHostTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameHostTeamDropgoals,
  //       gameVisitorTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamDropgoals,
  //       gameHostTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamYellowCards,
  //       gameVisitorTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamYellowCards,
  //       gameHostTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamRedCards,
  //       gameVisitorTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamRedCards,
  //       gameIsRunning: nextProps.CurrentGameRunningStatistics[0].gameIsRunning,
  //     });
  //   }
  // }

  close() {
    this.props.history.goBack();
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    // const gameSequenceNo = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameSequenceNo : 'Loading...';
    // const gameDate = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameDate : 'Loading...';
    const gameHostAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameHostAlias : 'Loading...';
    const gameVisitorAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVisitorAlias : 'Loading...';
    // const gameVenue = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVenue : 'Loading...';
    // const gameCity = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameCity : 'Loading...';
    // const gameKickoff = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameKickoff : 'Loading...';
    return (
      <div id="player-analysis-viewer-comp">
        <div className="container player-analysis-viewer-area">
          {/* <div className="text-center">
            <div className="text-center game-row1">Game #{gameSequenceNo} (193/200)</div>
            <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')} @ {gameKickoff}</div>
            <div className="game-row2">{gameVenue}, {gameCity}</div>
          </div> */}
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row8 col-md-12 text-center">Your Analysis</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row5 col-md-5 text-center">{gameHostAlias}</div>
            <span className="game-vs  col-md-2 text-center"></span>
            <div className="game-row5 col-md-5 text-center">{gameVisitorAlias}</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row4 col-md-3 text-center">{this.state.playerHostScore}</div>
            <div className="col-md-4 game-row6 text-center">Score</div>
            <div className="game-row4 col-md-3 text-center">{this.state.playerVisitorScore}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamTries}</div>
            <div className="col-md-6 game-row1 text-center">Tries</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamTries}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamConvs}</div>
            <div className="col-md-6 game-row1 text-center">Conversions</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamConvs}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamPenalties}</div>
            <div className="col-md-6 game-row1 text-center">Penalty kicks</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamPenalties}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamDropgoals}</div>
            <div className="col-md-6 game-row1 text-center">Dropgoals</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamDropgoals}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamYellowCards}</div>
            <div className="col-md-6 game-row1 text-center">Yellow cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamYellowCards}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamRedCards}</div>
            <div className="col-md-6 game-row1 text-center">Red cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamRedCards}</div>
          </div>
        </div>
      </div>
    );
  }
}
