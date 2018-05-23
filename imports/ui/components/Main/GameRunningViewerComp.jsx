import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './GameRunningViewerComp.less';

export default class GameRunningViewerComp extends Component {
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
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.gameHostScore !== this.state.gameHostScore ||
      nextProps.gameVisitorScore !== this.state.gameVisitorScore ||
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
    const { feedbackMessage, feedbackMessageType } = this.state;
    const gameSequenceNo = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameSequenceNo : 'Loading...';
    const gameDate = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameDate : 'Loading...';
    const gameHostAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameHostAlias : 'Loading...';
    const gameVisitorAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVisitorAlias : 'Loading...';
    const gameVenue = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVenue : 'Loading...';
    const gameCity = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameCity : 'Loading...';
    const gameKickoff = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameKickoff : 'Loading...';
    return (
      <div id="game-running-viewer-comp">
        <div className="container game-running-viewer-area">
          <div className="text-center">
            <div className="text-center game-row1">Game #{gameSequenceNo} (193/200)</div>
            <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')} @ {gameKickoff}</div>
            <div className="game-row2">{gameVenue}, {gameCity}</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row5 col-md-5 text-center">{gameHostAlias}</div>
            <span className="game-vs  col-md-2 text-center">vs</span>
            <div className="game-row5 col-md-5 text-center">{gameVisitorAlias}</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row4 col-md-3 text-center">{this.state.gameHostScore}</div>
            <div className="col-md-4 game-row6 text-center">Score</div>
            <div className="game-row4 col-md-3 text-center">{this.state.gameVisitorScore}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamTries}</div>
            <div className="col-md-6 game-row1 text-center">Tries</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamTries}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamConvs}</div>
            <div className="col-md-6 game-row1 text-center">Conversions</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamConvs}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamPenalties}</div>
            <div className="col-md-6 game-row1 text-center">Penalty kicks</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamPenalties}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamDropgoals}</div>
            <div className="col-md-6 game-row1 text-center">Dropgoals</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamDropgoals}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamYellowCards}</div>
            <div className="col-md-6 game-row1 text-center">Yellow cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamYellowCards}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamRedCards}</div>
            <div className="col-md-6 game-row1 text-center">Red cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamRedCards}</div>
          </div>
        </div>
      </div>
    );
  }
}
