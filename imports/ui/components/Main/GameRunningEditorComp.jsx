import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './GameRunningEditorComp.less';

export default class GameRunningEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSetupId: props.match.params.gameSetupId,
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
    this.createRunningStatsDocument = this.createRunningStatsDocument.bind(this);
    this.updateRunningStats = this.updateRunningStats.bind(this);
    this.calculateScores = this.calculateScores.bind(this);
    this.handleHostTeamTriesChange = this.handleHostTeamTriesChange.bind(this);
    this.handleVisitorTeamTriesChange = this.handleVisitorTeamTriesChange.bind(this);
    this.handleHostTeamConvsChange = this.handleHostTeamConvsChange.bind(this);
    this.handleVisitorTeamConvsChange = this.handleVisitorTeamConvsChange.bind(this);
    this.handleHostTeamPenaltiesChange = this.handleHostTeamPenaltiesChange.bind(this);
    this.handleVisitorTeamPenaltiesChange = this.handleVisitorTeamPenaltiesChange.bind(this);
    this.handleHostTeamDropgoalsChange = this.handleHostTeamDropgoalsChange.bind(this);
    this.handleVisitorTeamDropgoalsChange = this.handleVisitorTeamDropgoalsChange.bind(this);
    this.handleHostTeamYellowCardsChange = this.handleHostTeamYellowCardsChange.bind(this);
    this.handleVisitorTeamYellowCardsChange = this.handleVisitorTeamYellowCardsChange.bind(this);
    this.handleHostTeamRedCardsChange = this.handleHostTeamRedCardsChange.bind(this);
    this.handleVisitorTeamRedCardsChange = this.handleVisitorTeamRedCardsChange.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentWillMount() {
    const { gameSetupId } = this.state;
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
        Meteor.call('game_running_statistics.fetch', gameSetupId, (error, result) => {
          if (error) {
            this.setState({
              feedbackMessage: error.reason,
              feedbackMessageType: 'danger',
            });
          } else {
            console.log('game_running_statistics.fetch result:', result)
            if (result) {
              this.setState({
                gameRunningStatsId: result._id,
                gameSetupId: result.gameSetupId,
                gameHostScore: result.gameHostScore,
                gameVisitorScore: result.gameVisitorScore,
                gameHostTeamTries: result.gameHostTeamTries,
                gameVisitorTeamTries: result.gameVisitorTeamTries,
                gameHostTeamConvs: result.gameHostTeamConvs,
                gameVisitorTeamConvs: result.gameVisitorTeamConvs,
                gameHostTeamPenalties: result.gameHostTeamPenalties,
                gameVisitorTeamPenalties: result.gameVisitorTeamPenalties,
                gameHostTeamDropgoals: result.gameHostTeamDropgoals,
                gameVisitorTeamDropgoals: result.gameVisitorTeamDropgoals,
                gameHostTeamYellowCards: result.gameHostTeamYellowCards,
                gameVisitorTeamYellowCards: result.gameVisitorTeamYellowCards,
                gameHostTeamRedCards: result.gameHostTeamRedCards,
                gameVisitorTeamRedCards: result.gameVisitorTeamRedCards,
                gameIsRunning: result.gameIsRunning,
              });
            }
          }
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.gameHostScore !== this.state.gameHostScore ||
      prevState.gameVisitorScore !== this.state.gameVisitorScore ||
      prevState.gameHostTeamTries !== this.state.gameHostTeamTries ||
      prevState.gameHostTeamDropgoals !== this.state.gameHostTeamDropgoals ||
      prevState.gameHostTeamConvs !== this.state.gameHostTeamConvs ||
      prevState.gameHostTeamPenalties !== this.state.gameHostTeamPenalties ||
      prevState.gameVisitorTeamTries !== this.state.gameVisitorTeamTries ||
      prevState.gameVisitorTeamConvs !== this.state.gameVisitorTeamConvs ||
      prevState.gameVisitorTeamPenalties !== this.state.gameVisitorTeamPenalties ||
      prevState.gameVisitorTeamDropgoals !== this.state.gameVisitorTeamDropgoals
    ) {
      this.calculateScores();
    }
    if (
      prevState.gameHostScore !== this.state.gameHostScore ||
      prevState.gameVisitorScore !== this.state.gameVisitorScore ||
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
    gameHostScore += this.state.gameHostTeamTries * 5;
    gameHostScore += this.state.gameHostTeamDropgoals * 3;
    gameHostScore += this.state.gameHostTeamConvs * 2;
    gameHostScore += this.state.gameHostTeamPenalties * 3;
    gameVisitorScore += this.state.gameVisitorTeamTries * 5;
    gameVisitorScore += this.state.gameVisitorTeamConvs * 2;
    gameVisitorScore += this.state.gameVisitorTeamPenalties * 3;
    gameVisitorScore += this.state.gameVisitorTeamDropgoals * 3;
    this.setState({
      gameHostScore,
      gameVisitorScore,
    });
  }

  close() {
    this.props.history.goBack();
  }

  handleHostTeamTriesChange(e) {
    if (Number(e.target.value) < Number(this.state.gameHostTeamConvs)) {
      this.setState({
        gameHostTeamTries: e.target.value,
        gameHostTeamConvs: e.target.value,
      });
    } else {
      this.setState({
        gameHostTeamTries: e.target.value,
      });
    }
  }

  handleVisitorTeamTriesChange(e) {
    if (Number(e.target.value) < Number(this.state.gameVisitorTeamConvs)) {
      this.setState({
        gameVisitorTeamTries: e.target.value,
        gameVisitorTeamConvs: e.target.value,
      });
    } else {
      this.setState({
        gameVisitorTeamTries: e.target.value,
      });
    }
  }

  handleHostTeamConvsChange(e) {
    this.setState({
      gameHostTeamConvs: e.target.value,
    });
  }

  handleVisitorTeamConvsChange(e) {
    this.setState({
      gameVisitorTeamConvs: e.target.value,
    });
  }

  handleHostTeamPenaltiesChange(e) {
    this.setState({
      gameHostTeamPenalties: e.target.value,
    });
  }

  handleVisitorTeamPenaltiesChange(e) {
    this.setState({
      gameVisitorTeamPenalties: e.target.value,
    });
  }

  handleHostTeamDropgoalsChange(e) {
    this.setState({
      gameHostTeamDropgoals: e.target.value,
    });
  }

  handleVisitorTeamDropgoalsChange(e) {
    this.setState({
      gameVisitorTeamDropgoals: e.target.value,
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
      gameWinner: 'VISITORTEAM',
      gameIsRunning: true,
    };
    console.log('gameRunningStatsInitInfo:', gameRunningStatsInitInfo)
    Meteor.call('game_running_statistics.create', gameRunningStatsInitInfo, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('game_running_statistics.create RES:', result)
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

  updateRunningStats() {
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    console.log('STATE:', this.state);
    const { gameRunningStatsId } = this.state;
    const gameRunningStatsInfo = {
      gameSetupId: this.state.gameSetupId,
      gameHostScore: this.state.gameHostScore,
      gameVisitorScore: this.state.gameVisitorScore,
      gameHostTeamTries: this.state.gameHostTeamTries,
      gameVisitorTeamTries: this.state.gameVisitorTeamTries,
      gameHostTeamConvs: this.state.gameHostTeamConvs,
      gameVisitorTeamConvs: this.state.gameVisitorTeamConvs,
      gameHostTeamPenalties: this.state.gameHostTeamPenalties,
      gameVisitorTeamPenalties: this.state.gameVisitorTeamPenalties,
      gameHostTeamDropgoals: this.state.gameHostTeamDropgoals,
      gameVisitorTeamDropgoals: this.state.gameVisitorTeamDropgoals,
      gameHostTeamYellowCards: this.state.gameHostTeamYellowCards,
      gameVisitorTeamYellowCards: this.state.gameVisitorTeamYellowCards,
      gameHostTeamRedCards: this.state.gameHostTeamRedCards,
      gameVisitorTeamRedCards: this.state.gameVisitorTeamRedCards,
      gameWinner: (this.state.gameHostScore > this.state.gameVisitorScore) ? 'HOSTTEAM' : 'VISITORTEAM',
      gameIsRunning: this.state.gameIsRunning,
    };
    console.log('gameRunningStatsId:', gameRunningStatsId);
    console.log('gameRunningStatsInfo:', gameRunningStatsInfo);

    Meteor.call('game_running_statistics.update', gameRunningStatsId, gameRunningStatsInfo, (err, result) => {
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
        Meteor.call('updatePlayersScores', gameRunningStatsInfo, (err) => {
          if (err) {
            console.log('game_running_statistics.update ERR:', err)
          }
        })
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
    const noValuesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const hostConvsArr = noValuesArr.filter((val, i) => {
      return (i <= this.state.gameHostTeamTries);
    });
    const visitorConvsArr = noValuesArr.filter((val, i) => {
      return (i <= this.state.gameVisitorTeamTries);
    });
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
              <div className="col-md-12 center-block alert-area">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
              </div>
              <form
                id="game-running-editor-form"
                className="form col-md-12 center-block"
              >
              <div className="modal-body container">
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
                  <div className="col-md-3 game-row6 text-center">Score</div>
                  <div className="game-row4 col-md-3 text-center">{this.state.gameVisitorScore}</div>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-tries"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameHostTeamTries}
                    onChange={this.handleHostTeamTriesChange}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Tries</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-tries"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameVisitorTeamTries}
                    onChange={this.handleVisitorTeamTriesChange}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-convs"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameHostTeamConvs}
                    onChange={this.handleHostTeamConvsChange}
                  >
                    {hostConvsArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Conversions</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-convs"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameVisitorTeamConvs}
                    onChange={this.handleVisitorTeamConvsChange}
                  >
                    {visitorConvsArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-penalties"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameHostTeamPenalties}
                    onChange={this.handleHostTeamPenaltiesChange}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Penalty kicks</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-penalties"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameVisitorTeamPenalties}
                    onChange={this.handleVisitorTeamPenaltiesChange}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-dropgoals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameHostTeamDropgoals}
                    onChange={this.handleHostTeamDropgoalsChange}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Dropgoals</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-dropgoals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.gameVisitorTeamDropgoals}
                    onChange={this.handleVisitorTeamDropgoalsChange}
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
                  <Button
                    className="stop-btn"
                    bsStyle="danger"
                    bsSize="large"
                    block
                    onClick={this.stopGame}
                  >
                    STOP GAME
                  </Button>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
