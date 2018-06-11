import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Panel, Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment/moment';
import './ActiveGamePanelComp.less';

export default class ActiveGamePanelComp extends Component {
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
      noOfPlayers: 0,
    };
    this.showPlayerAnalysisEditor = this.showPlayerAnalysisEditor.bind(this);
  }

  componentWillMount() {
    const { noOfPlayers } = this.props
    // Get prizes information from DB.
    Meteor.call('prize_monies.lookup', noOfPlayers, (err, result) => {
      console.log('prize_monies.lookup1 ERR:', err)
      console.log('prize_monies.lookup1 RESULT:', result)
      if (err) {
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
        this.setState({
          prizesMoniesInfo: result,
          noOfPlayers,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.noOfPlayers !== this.state.noOfPlayers) {
      Meteor.call('prize_monies.lookup', nextProps.noOfPlayers, (err, result) => {
        console.log('prize_monies.lookup2 ERR:', err)
        console.log('prize_monies.lookup2 RESULT:', result)
        if (err) {
          const prizesMoniesInfo = {
            firstPrize: 'Loading...',
            secondPrize: 'Loading...',
            thirdPrize: 'Loading...',
            nextTenPrizes: 'Loading...',
          };
          this.setState({
            prizesMoniesInfo,
            noOfPlayers: nextProps.noOfPlayers,
          });
        } else {
          this.setState({
            prizesMoniesInfo: result,
            noOfPlayers: nextProps.noOfPlayers,
          });
        }
      });
    }
  }

  showPlayerAnalysisEditor(gameSetupId) {
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      this.props.history.push(`/game/running/editor/${gameSetupId}`)
    } else if (!(this.props.gameSetup && this.props.gameSetup.gameStatus === 'open')) {
      console.log('HMMMM:', this.props)
      this.props.history.push(`/game/running/stats_viewer/${gameSetupId}`);
    } else {
      console.log('this.props.gameSetup.gameStatus:', this.props.gameSetup.gameStatus)
      this.props.history.push(`/game/analysis/${gameSetupId}`);
    }
  }

  render() {
    const {
      gameHostAlias,
      gameVisitorAlias,
      gameKickoff,
      gameVenue,
      gameCity,
      gameDate,
      gameSequenceNo,
    } = this.props.gameSetup;
    const gameSetupId = this.props.gameSetup._id;
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
    const gameStatus = (this.props.gameSetup.gameStatus && this.props.gameSetup.gameStatus.toUpperCase()) || 'UNKNOWN';
    return (
      <div id="active-game-panel-comp">
        <OverlayTrigger
          trigger={['hover']}
          placement="top"
          overlay={popoverHoverFocus}
        >
          <Panel className="active-game-panel">
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                <span>Game #{gameSequenceNo} <span className="no-of-players">({this.state.noOfPlayers}/200)</span></span>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body className="active-game-panel-body" onClick={() => this.showPlayerAnalysisEditor(gameSetupId)} {...this.props}>
              <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')}</div>
              <div className={(gameStatus === 'RUNNING') ? "game-row1-running" : "game-row1-open"}>{gameHostAlias} <span className="game-vs">vs</span> {gameVisitorAlias}</div>
              <div className="game-row2">{gameVenue}</div>
              <div className="game-row2">{gameCity}</div>
              <div className="game-row3">({gameKickoff})</div>
            </Panel.Body>
            <Panel.Footer>{gameStatus}</Panel.Footer>
          </Panel>
        </OverlayTrigger>
      </div>
    );
  }
}
