import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import LeaderBoardViewerContainer from '../../containers/Main/LeaderBoardViewerContainer';
import './GameRunningEditorComp.less';

export default class GameRunningEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSetupId: props.match.params.gameSetupId,
      feedbackMessage: '',
      gameRunningStatsId: '',
      gameHostTeamGoals: '0',
      gameVisitorTeamGoals: '0',
      gameHostTeamShots: '0',
      gameVisitorTeamShots: '0',
      gameHostTeamShotsOnTarget: '0',
      gameVisitorTeamShotsOnTarget: '0',
      gameHostTeamCorners: '0',
      gameVisitorTeamCorners: '0',
      gameHostTeamYellowCards: '0',
      gameVisitorTeamYellowCards: '0',
      gameHostTeamRedCards: '0',
      gameVisitorTeamRedCards: '0',
      gameHostScore: 0,
      gameVisitorScore: 0,
      noOfPlayers: 0,
    };
    this.close = this.close.bind(this);
    this.createRunningStatsDocument = this.createRunningStatsDocument.bind(this);
    this.updateRunningStats = this.updateRunningStats.bind(this);
    this.calculateScores = this.calculateScores.bind(this);
    this.handleHostTeamGoalsChange = this.handleHostTeamGoalsChange.bind(this);
    this.handleVisitorTeamGoalsChange = this.handleVisitorTeamGoalsChange.bind(this);
    this.handleHostTeamShotsChange = this.handleHostTeamShotsChange.bind(this);
    this.handleVisitorTeamShotsChange = this.handleVisitorTeamShotsChange.bind(this);
    this.handleHostTeamShotsOnTargetChange = this.handleHostTeamShotsOnTargetChange.bind(this);
    this.handleVisitorTeamShotsOnTargetChange = this.handleVisitorTeamShotsOnTargetChange.bind(this);
    this.handleHostTeamCornersChange = this.handleHostTeamCornersChange.bind(this);
    this.handleVisitorTeamCornersChange = this.handleVisitorTeamCornersChange.bind(this);
    this.handleHostTeamYellowCardsChange = this.handleHostTeamYellowCardsChange.bind(this);
    this.handleVisitorTeamYellowCardsChange = this.handleVisitorTeamYellowCardsChange.bind(this);
    this.handleHostTeamRedCardsChange = this.handleHostTeamRedCardsChange.bind(this);
    this.handleVisitorTeamRedCardsChange = this.handleVisitorTeamRedCardsChange.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentWillMount() {
    const { gameSetupId } = this.state;
    Meteor.call('game_setup.fetch', gameSetupId, (err, gameSetupInfo) => {
      if (err) {
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        this.setState({
          gameSetupInfo,
        });
        Meteor.call('game_running_statistics.fetch', gameSetupId, (error, result) => {
          if (error) {
            this.setState({
              feedbackMessage: error.reason,
              feedbackMessageType: 'danger',
            });
          } else {
            if (result) {
              this.setState({
                gameRunningStatsId: result._id,
                gameSetupId: result.gameSetupId,
                gameHostScore: result.gameHostScore,
                gameVisitorScore: result.gameVisitorScore,
                gameHostTeamGoals: result.gameHostTeamGoals,
                gameVisitorTeamGoals: result.gameVisitorTeamGoals,
                gameHostTeamShots: result.gameHostTeamShots,
                gameVisitorTeamShots: result.gameVisitorTeamShots,
                gameHostTeamShotsOnTarget: result.gameHostTeamShotsOnTarget,
                gameVisitorTeamShotsOnTarget: result.gameVisitorTeamShotsOnTarget,
                gameHostTeamCorners: result.gameHostTeamCorners,
                gameVisitorTeamCorners: result.gameVisitorTeamCorners,
                gameHostTeamYellowCards: result.gameHostTeamYellowCards,
                gameVisitorTeamYellowCards: result.gameVisitorTeamYellowCards,
                gameHostTeamRedCards: result.gameHostTeamRedCards,
                gameVisitorTeamRedCards: result.gameVisitorTeamRedCards,
                gameIsRunning: true,
              });
            }
          }
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.noOfPlayers !== this.state.noOfPlayers) {
      this.setState({
        noOfPlayers: nextProps.noOfPlayers,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.gameHostScore !== this.state.gameHostScore ||
      prevState.gameVisitorScore !== this.state.gameVisitorScore ||
      prevState.gameHostTeamGoals !== this.state.gameHostTeamGoals ||
      // prevState.gameHostTeamCorners !== this.state.gameHostTeamCorners ||
      // prevState.gameHostTeamShots !== this.state.gameHostTeamShots ||
      // prevState.gameHostTeamShotsOnTarget !== this.state.gameHostTeamShotsOnTarget ||
      prevState.gameVisitorTeamGoals !== this.state.gameVisitorTeamGoals
      // prevState.gameVisitorTeamShots !== this.state.gameVisitorTeamShots ||
      // prevState.gameVisitorTeamShotsOnTarget !== this.state.gameVisitorTeamShotsOnTarget ||
      // prevState.gameVisitorTeamCorners !== this.state.gameVisitorTeamCorners
    ) {
      this.calculateScores();
    }
    if (
      prevState.gameHostScore !== this.state.gameHostScore ||
      prevState.gameVisitorScore !== this.state.gameVisitorScore ||
      prevState.gameHostTeamGoals !== this.state.gameHostTeamGoals ||
      prevState.gameHostTeamCorners !== this.state.gameHostTeamCorners ||
      prevState.gameHostTeamShots !== this.state.gameHostTeamShots ||
      prevState.gameHostTeamShotsOnTarget !== this.state.gameHostTeamShotsOnTarget ||
      prevState.gameVisitorTeamGoals !== this.state.gameVisitorTeamGoals ||
      prevState.gameVisitorTeamShots !== this.state.gameVisitorTeamShots ||
      prevState.gameVisitorTeamShotsOnTarget !== this.state.gameVisitorTeamShotsOnTarget ||
      prevState.gameVisitorTeamCorners !== this.state.gameVisitorTeamCorners ||
      prevState.gameHostTeamYellowCards !== this.state.gameHostTeamYellowCards ||
      prevState.gameVisitorTeamYellowCards !== this.state.gameVisitorTeamYellowCards ||
      prevState.gameHostTeamRedCards !== this.state.gameHostTeamRedCards ||
      prevState.gameVisitorTeamRedCards !== this.state.gameVisitorTeamRedCards
    ) {
      this.updateRunningStats();
    }
  }

  calculateScores() {
    let gameHostScore = 0;
    let gameVisitorScore = 0;
    gameHostScore += this.state.gameHostTeamGoals * 1;
    gameVisitorScore += this.state.gameVisitorTeamGoals * 1;
    this.setState({
      gameHostScore,
      gameVisitorScore,
    });
  }

  close() {
    this.props.history.goBack();
  }

  handleHostTeamGoalsChange(e) {
    this.setState({
      gameHostTeamGoals: e.target.value,
    });
  }

  handleVisitorTeamGoalsChange(e) {
    this.setState({
      gameVisitorTeamGoals: e.target.value,
    });
  }

  handleHostTeamShotsChange(e) {
    this.setState({
      gameHostTeamShots: e.target.value,
    });
  }

  handleVisitorTeamShotsChange(e) {
    this.setState({
      gameVisitorTeamShots: e.target.value,
    });
  }

  handleHostTeamShotsOnTargetChange(e) {
    this.setState({
      gameHostTeamShotsOnTarget: e.target.value,
    });
  }

  handleVisitorTeamShotsOnTargetChange(e) {
    this.setState({
      gameVisitorTeamShotsOnTarget: e.target.value,
    });
  }

  handleHostTeamCornersChange(e) {
    this.setState({
      gameHostTeamCorners: e.target.value,
    });
  }

  handleVisitorTeamCornersChange(e) {
    this.setState({
      gameVisitorTeamCorners: e.target.value,
    });
  }

  handleHostTeamYellowCardsChange(e) {
    this.setState({
      gameHostTeamYellowCards: e.target.value,
    });
  }

  handleVisitorTeamYellowCardsChange(e) {
    this.setState({
      gameVisitorTeamYellowCards: e.target.value,
    });
  }

  handleHostTeamRedCardsChange(e) {
    this.setState({
      gameHostTeamRedCards: e.target.value,
    });
  }

  handleVisitorTeamRedCardsChange(e) {
    this.setState({
      gameVisitorTeamRedCards: e.target.value,
    });
  }

  createRunningStatsDocument() {
    const gameRunningStatsInitInfo = {
      gameSetupId: this.state.gameSetupId,
      gameHostTeamGoals: '0',
      gameVisitorTeamGoals: '0',
      gameHostTeamShots: '0',
      gameVisitorTeamShots: '0',
      gameHostTeamShotsOnTarget: '0',
      gameVisitorTeamShotsOnTarget: '0',
      gameHostTeamCorners: '0',
      gameVisitorTeamCorners: '0',
      gameHostTeamYellowCards: '0',
      gameVisitorTeamYellowCards: '0',
      gameHostTeamRedCards: '0',
      gameVisitorTeamRedCards: '0',
      gameHostScore: 0,
      gameVisitorScore: 0,
      gameWinner: 'VISITORTEAM',
    };
    Meteor.call('game_running_statistics.create', gameRunningStatsInitInfo, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        Meteor.call('game_setup.update_status', this.state.gameSetupId, 'running', (errStatus) => {
          if (err) {
            this.setState({
              feedbackMessage: `ERROR: ${errStatus.reason}`,
              feedbackMessageType: 'danger',
            });
          } else {
            this.setState({
              feedbackMessage: 'Game Stats Document initialized!',
              feedbackMessageType: 'success',
              gameRunningStatsId: result,
              gameIsRunning: true,
            });
            setTimeout(() => {
              this.setState({
                feedbackMessage: '',
                feedbackMessageType: '',
              });
            }, 3000);
          }
        });
      }
    });
  }

  updateRunningStats() {
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    const { gameRunningStatsId } = this.state;
    const gameRunningStatsInfo = {
      gameSetupId: this.state.gameSetupId,
      gameHostScore: this.state.gameHostScore,
      gameVisitorScore: this.state.gameVisitorScore,
      gameHostTeamGoals: this.state.gameHostTeamGoals,
      gameVisitorTeamGoals: this.state.gameVisitorTeamGoals,
      gameHostTeamShots: this.state.gameHostTeamShots,
      gameVisitorTeamShots: this.state.gameVisitorTeamShots,
      gameHostTeamShotsOnTarget: this.state.gameHostTeamShotsOnTarget,
      gameVisitorTeamShotsOnTarget: this.state.gameVisitorTeamShotsOnTarget,
      gameHostTeamCorners: this.state.gameHostTeamCorners,
      gameVisitorTeamCorners: this.state.gameVisitorTeamCorners,
      gameHostTeamYellowCards: this.state.gameHostTeamYellowCards,
      gameVisitorTeamYellowCards: this.state.gameVisitorTeamYellowCards,
      gameHostTeamRedCards: this.state.gameHostTeamRedCards,
      gameVisitorTeamRedCards: this.state.gameVisitorTeamRedCards,
      gameWinner: (this.state.gameHostScore > this.state.gameVisitorScore) ? 'HOSTTEAM' : 'VISITORTEAM',
    };

    Meteor.call('game_running_statistics.update', gameRunningStatsId, gameRunningStatsInfo, (err) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        this.setState({
          feedbackMessage: 'Game Stats Updated!',
          feedbackMessageType: 'success',
        });
        Meteor.call('updatePlayersScores', gameRunningStatsInfo, (gameRunningStatsInfoErr) => {
          if (gameRunningStatsInfoErr) {
            this.setState({
              feedbackMessage: `ERROR: ${gameRunningStatsInfoErr.reason}`,
              feedbackMessageType: 'danger',
            });
          } else {
            Meteor.call('updateLeaderboard', this.state.gameSetupId, (updateLeaderboardErr, updatedLeaderboard) => {
              if (updateLeaderboardErr) {
                this.setState({
                  feedbackMessage: `ERROR: ${updateLeaderboardErr.reason}`,
                  feedbackMessageType: 'danger',
                });
              } else {
                Meteor.call('game_leaderboard.fetch', this.state.gameSetupId, (errFetch, gameLeaderboard) => {
                  if (errFetch) {
                    this.setState({
                      feedbackMessage: `ERROR: ${errFetch.reason}`,
                      feedbackMessageType: 'danger',
                    });
                  } else if (gameLeaderboard && gameLeaderboard.gameSetupId) {
                    // if game_leaderboard ID available the just update. Else insert.
                    Meteor.call('game_leaderboard.update', gameLeaderboard.gameSetupId, updatedLeaderboard, (errUpdate) => {
                      if (errUpdate) {
                        this.setState({
                          feedbackMessage: `ERROR: ${errUpdate.reason}`,
                          feedbackMessageType: 'danger',
                        });
                      }
                    });
                  } else {
                    // Create/Insert game_leaderboard.
                    Meteor.call('game_leaderboard.create', this.state.gameSetupId, updatedLeaderboard, (errInsert) => {
                      if (errInsert) {
                        this.setState({
                          feedbackMessage: `ERROR: ${errInsert.reason}`,
                          feedbackMessageType: 'danger',
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
        setTimeout(() => {
          this.setState({
            feedbackMessage: '',
            feedbackMessageType: '',
          });
        }, 3000);
      }
    });
  }

  startGame() {
    this.createRunningStatsDocument();
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
    const noValuesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    let gameIsRunning = true;
    let startBtnText = '';
    if (!this.state.gameIsRunning) {
      startBtnText = 'START GAME';
      gameIsRunning = false;
    } else {
      startBtnText = 'GAME IS RUNNING';
      gameIsRunning = true;
    }

    return (
      <div id="game-running-editor-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="text-center">Game Statistics Editor</div>
              </div>
              <div className="row">
                <form
                  id="game-running-editor-form"
                  className="form col-md-8 center-block"
                >
                  <div className="modal-body container">
                    <div className="col-md-12 center-block alert-area">
                      {(feedbackMessage) ?
                        <Alert bsStyle={feedbackMessageType}>
                          {feedbackMessage}
                        </Alert>
                      : null }
                    </div>
                    <div className="text-center">
                      <div className="text-center game-row1">Game #{gameSequenceNo}
                        <span className="no-of-players">({this.state.noOfPlayers}/200)</span>
                      </div>
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
                      <div className="col-md-3 game-row6 text-center">Score</div>
                      <div className="game-row4 col-md-3 text-center">{this.state.gameVisitorScore}</div>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-goals"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamGoals}
                        onChange={this.handleHostTeamGoalsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center">Goals</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-goals"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamGoals}
                        onChange={this.handleVisitorTeamGoalsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-shots"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamShots}
                        onChange={this.handleHostTeamShotsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center">Shots</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-shots"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamShots}
                        onChange={this.handleVisitorTeamShotsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-shots-on-target"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamShotsOnTarget}
                        onChange={this.handleHostTeamShotsOnTargetChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center shots-on-target-label">Shots On Target</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-shots-on-target"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamShotsOnTarget}
                        onChange={this.handleVisitorTeamShotsOnTargetChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-corners"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamCorners}
                        onChange={this.handleHostTeamCornersChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center">Corners</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-corners"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamCorners}
                        onChange={this.handleVisitorTeamCornersChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-yellowcards"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamYellowCards}
                        onChange={this.handleHostTeamYellowCardsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center">Yellow cards</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-yellowcards"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamYellowCards}
                        onChange={this.handleVisitorTeamYellowCardsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <div className="section-row form-group row justify-content-md-center">
                      <select
                        name="form-field-name"
                        id="game-host-team-redcards"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameHostTeamRedCards}
                        onChange={this.handleHostTeamRedCardsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                      <div className="col-md-4 game-row1 text-center">Red cards</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team-redcards"
                        className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                        value={this.state.gameVisitorTeamRedCards}
                        onChange={this.handleVisitorTeamRedCardsChange}
                      >
                        {noValuesArr.map(val => <option value={val}>{val}</option>)}
                      </select>
                    </div>
                    <hr />
                    <div className="form-group btn-area text-center col-md-12">
                      <Button
                        className="start-btn"
                        bsStyle="success"
                        bsSize="large"
                        block
                        onClick={this.startGame}
                        disabled={gameIsRunning}
                      >
                        {startBtnText}
                      </Button>
                      {/* <Button
                        className="stop-btn"
                        bsStyle="danger"
                        bsSize="large"
                        block
                        onClick={this.stopGame}
                      >
                        STOP GAME
                      </Button> */}
                      <Button
                        className="exit-btn"
                        bsStyle="warning"
                        bsSize="large"
                        block
                        onClick={this.close}
                      >
                        EXIT
                      </Button>
                    </div>
                  </div>
                </form>
                <div className="col-md-4">
                  <LeaderBoardViewerContainer {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
