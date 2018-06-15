import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment/moment'
import './GameRunningViewerComp.less';

export default class GameRunningViewerComp extends Component {
  constructor(props) {
    super(props);
    const prizesMoniesInfo = {
      firstPrize: 'Loading...',
      secondPrize: 'Loading...',
      thirdPrize: 'Loading...',
      nextTenPrizes: 'Loading...',
    };
    this.state = {
      prizesMoniesInfo,
      feedbackMessage: '',
      gameRunningStatsId: '',
      gameHostTeamGoals: '0',
      gameVisitorTeamGoals: '0',
      gameHostTeamShots: '0',
      gameVisitorTeamShots: '0',
      gameHostTeamShotsOnTarget: '0',
      gameVisitorTeamShotsOnTarget: '0',
      gameHostTeamDropgoals: '0',
      gameVisitorTeamDropgoals: '0',
      gameHostTeamYellowCards: '0',
      gameVisitorTeamYellowCards: '0',
      gameHostTeamRedCards: '0',
      gameVisitorTeamRedCards: '0',
      gameHostScore: 0,
      gameVisitorScore: 0,
      noOfPlayers: 0,
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
      nextProps.gameHostTeamGoals !== this.state.gameHostTeamGoals ||
      nextProps.gameHostTeamDropgoals !== this.state.gameHostTeamDropgoals ||
      nextProps.gameHostTeamShots !== this.state.gameHostTeamShots ||
      nextProps.gameHostTeamShotsOnTarget !== this.state.gameHostTeamShotsOnTarget ||
      nextProps.gameVisitorTeamGoals !== this.state.gameVisitorTeamGoals ||
      nextProps.gameVisitorTeamShots !== this.state.gameVisitorTeamShots ||
      nextProps.gameVisitorTeamShotsOnTarget !== this.state.gameVisitorTeamShotsOnTarget ||
      nextProps.gameVisitorTeamDropgoals !== this.state.gameVisitorTeamDropgoals ||
      nextProps.gameHostTeamYellowCards !== this.state.gameHostTeamYellowCards ||
      nextProps.gameVisitorTeamYellowCards !== this.state.gameVisitorTeamYellowCards ||
      nextProps.gameHostTeamRedCards !== this.state.gameHostTeamRedCards ||
      nextProps.gameVisitorTeamRedCards !== this.state.gameVisitorTeamRedCards ||
      nextProps.noOfPlayers !== this.state.noOfPlayers
    ) {
      Meteor.call('prize_monies.lookup', nextProps.noOfPlayers, (err, result) => {
        let prizesMoniesInfo = {};
        if (err) {
          prizesMoniesInfo = {
            firstPrize: 'Loading...',
            secondPrize: 'Loading...',
            thirdPrize: 'Loading...',
            nextTenPrizes: 'Loading...',
          };
        } else {
          prizesMoniesInfo = result;
        }
        this.setState({
          prizesMoniesInfo,
          gameRunningStatsId: nextProps.CurrentGameRunningStatistics[0]._id,
          gameSetupId: nextProps.CurrentGameRunningStatistics[0].gameSetupId,
          gameHostScore: nextProps.CurrentGameRunningStatistics[0].gameHostScore,
          gameVisitorScore: nextProps.CurrentGameRunningStatistics[0].gameVisitorScore,
          gameHostTeamGoals: nextProps.CurrentGameRunningStatistics[0].gameHostTeamGoals,
          gameVisitorTeamGoals: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamGoals,
          gameHostTeamShots: nextProps.CurrentGameRunningStatistics[0].gameHostTeamShots,
          gameVisitorTeamShots: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamShots,
          gameHostTeamShotsOnTarget: nextProps.CurrentGameRunningStatistics[0].gameHostTeamShotsOnTarget,
          gameVisitorTeamShotsOnTarget: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamShotsOnTarget,
          gameHostTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameHostTeamDropgoals,
          gameVisitorTeamDropgoals: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamDropgoals,
          gameHostTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamYellowCards,
          gameVisitorTeamYellowCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamYellowCards,
          gameHostTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameHostTeamRedCards,
          gameVisitorTeamRedCards: nextProps.CurrentGameRunningStatistics[0].gameVisitorTeamRedCards,
          gameIsRunning: nextProps.CurrentGameRunningStatistics[0].gameIsRunning,
          noOfPlayers: nextProps.noOfPlayers,
        });
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
    const popoverHoverFocus = (
      <Popover
        id="popover-trigger-hover"
        title={`Rewards Game#${gameSequenceNo}`}
      >
        <strong>{this.state.noOfPlayers} PLAYERS</strong>
        <div>1st: {this.state.prizesMoniesInfo.firstPrize} RBSAPoints</div>
        <div>2nd: {this.state.prizesMoniesInfo.secondPrize} RBSAPoints</div>
        <div>3rd: {this.state.prizesMoniesInfo.thirdPrize} RBSAPoints</div>
        <div>4th to 14th: {this.state.prizesMoniesInfo.nextTenPrizes} RBSAPoints</div>
      </Popover>
    );
    return (
      <div id="game-running-viewer-comp">
        <div className="container game-running-viewer-area">
          <div className="text-center">
            <OverlayTrigger
              trigger={['hover']}
              placement="bottom"
              overlay={popoverHoverFocus}
            >
              <div className="text-center game-row11">Game #{gameSequenceNo}
                <span className="no-of-players">({this.state.noOfPlayers}/200)</span>
              </div>
            </OverlayTrigger>
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
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamGoals}</div>
            <div className="col-md-6 game-row1 text-center">Goals</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamGoals}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamShots}</div>
            <div className="col-md-6 game-row1 text-center">Shots</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamShots}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.gameHostTeamShotsOnTarget}</div>
            <div className="col-md-6 game-row1 text-center">Shots On Target</div>
            <div className="col-md-3 game-row7 text-center">{this.state.gameVisitorTeamShotsOnTarget}</div>
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
