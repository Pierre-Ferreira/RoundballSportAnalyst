import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Panel, Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment/moment';
import './ActiveGamePanelComp.less';
// import GameCurrentPrizesComp from './GameCurrentPrizesComp';
// import AuthenticatedRouteComp from '../Routes/AuthenticatedRouteComp';

export default class ActiveGamePanelComp extends Component {
  constructor(props) {
    super(props);
    let prizesMoniesInfo = {
      firstPrize: 'Loading...',
      secondPrize: 'Loading...',
      thirdPrize: 'Loading...',
      nextTenPrizes: 'Loading...',
    }
    this.state = {
      prizesMoniesInfo,
    };
    this.showPlayerAnalysisEditor = this.showPlayerAnalysisEditor.bind(this);
  }

  componentWillMount() {
    // const { noOfPlayers } = this.props
    const noOfPlayers = Math.floor(Math.random() * ((200 - 0) + 1)) + 0;
    // Get prizes information from DB.
    Meteor.call('prize_monies.lookup', noOfPlayers, (err, result) => {
      if (err) {
        console.log('ERR:', err)
        const prizesMoniesInfo = {
          firstPrize: 'Loading...',
          secondPrize: 'Loading...',
          thirdPrize: 'Loading...',
          nextTenPrizes: 'Loading...',
        }
        this.setState({
          prizesMoniesInfo,
        });
      } else {
        console.log('RESULT:', result)
        this.setState({
          prizesMoniesInfo: result,
          noOfPlayers,
        });
      }
    });
  }

  showPlayerAnalysisEditor(gameId) {
    console.log('gameId:', gameId);
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      this.props.history.push(`/game/running/editor/${gameId}`)
    } else {
      this.props.history.push(`/game/analysis/${gameId}`)
    }
  }

  render() {
    const {
      gameHostTeam,
      gameHostAlias,
      gameVisitorTeam,
      gameVisitorAlias,
      gameKickoff,
      gameVenue,
      gameCity,
      gameDate,
      gameSequenceNo,
    } = this.props.gameSetup;
    const gameId = this.props.gameSetup._id;
    const popoverTitle = `Rewards Game#${gameSequenceNo}`
    const popoverHoverFocus = (
      <Popover
        id="popover-trigger-hover"
        title={popoverTitle}
      >
        <strong>{this.state.noOfPlayers} PLAYERS</strong>
        <div>1st: {this.state.prizesMoniesInfo.firstPrize} OSAPoints</div>
        <div>2nd: {this.state.prizesMoniesInfo.secondPrize} OSAPoints</div>
        <div>3rd: {this.state.prizesMoniesInfo.thirdPrize} OSAPoints</div>
        <div>4th to 14th: {this.state.prizesMoniesInfo.nextTenPrizes} OSAPoints</div>
      </Popover>
    );
    return (
      <div id="active-game-panel-comp">
        <Panel className="active-game-panel" {...this.props}>
          <Panel.Heading>
            <Panel.Title componentClass="h3">
              <OverlayTrigger
                trigger={['hover']}
                placement="top"
                overlay={popoverHoverFocus}
              >
                <span>Game #{gameSequenceNo} ({this.state.noOfPlayers}/200)</span>
              </OverlayTrigger>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className="active-game-panel-body" onClick={() => this.showPlayerAnalysisEditor(gameId)} {...this.props}>
            <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')}</div>
            <div className="game-row1">{gameHostAlias} <span className="game-vs">vs</span> {gameVisitorAlias}</div>
            <div className="game-row2">{gameVenue}</div>
            <div className="game-row2">{gameCity}</div>
            <div className="game-row3">({gameKickoff})</div>
          </Panel.Body>
          <Panel.Footer>ACTIVE</Panel.Footer>
        </Panel>
      </div>
    );
  }
}
