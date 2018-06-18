import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerAnalysisEditorComp.less';

export default class PlayerAnalysisEditorComp extends Component {
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
      PlayerGameAnalysisId: '',
      playerHostTeamGoals: '0',
      playerVisitorTeamGoals: '0',
      playerHostTeamShots: '0',
      playerVisitorTeamShots: '0',
      playerHostTeamShotsOnTarget: '0',
      playerVisitorTeamShotsOnTarget: '0',
      playerHostTeamCorners: '0',
      playerVisitorTeamCorners: '0',
      playerHostTeamYellowCards: '0',
      playerVisitorTeamYellowCards: '0',
      playerHostTeamRedCards: '0',
      playerVisitorTeamRedCards: '0',
      playerHostScore: 0,
      playerVisitorScore: 0,
      noOfPlayers: 0,
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  };

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
                playerHostTeamGoals: result.playerHostTeamGoals,
                playerVisitorTeamGoals: result.playerVisitorTeamGoals,
                playerHostTeamShots: result.playerHostTeamShots,
                playerVisitorTeamShots: result.playerVisitorTeamShots,
                playerHostTeamShotsOnTarget: result.playerHostTeamShotsOnTarget,
                playerVisitorTeamShotsOnTarget: result.playerVisitorTeamShotsOnTarget,
                playerHostTeamCorners: result.playerHostTeamCorners,
                playerVisitorTeamCorners: result.playerVisitorTeamCorners,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.noOfPlayers !== this.state.noOfPlayers) {
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
          noOfPlayers: nextProps.noOfPlayers,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.playerHostTeamGoals !== this.state.playerHostTeamGoals ||
      prevState.playerHostTeamCorners !== this.state.playerHostTeamCorners ||
      prevState.playerHostTeamShots !== this.state.playerHostTeamShots ||
      prevState.playerHostTeamShotsOnTarget !== this.state.playerHostTeamShotsOnTarget ||
      prevState.playerVisitorTeamGoals !== this.state.playerVisitorTeamGoals ||
      prevState.playerVisitorTeamShots !== this.state.playerVisitorTeamShots ||
      prevState.playerVisitorTeamShotsOnTarget !== this.state.playerVisitorTeamShotsOnTarget ||
      prevState.playerVisitorTeamCorners !== this.state.playerVisitorTeamCorners
    ) { this.calculateScores(); }
  }

  calculateScores() {
    let playerHostScore = 0;
    let playerVisitorScore = 0;
    playerHostScore += this.state.playerHostTeamGoals * 1;
    playerVisitorScore += this.state.playerVisitorTeamGoals * 1;
    this.setState({
      playerHostScore,
      playerVisitorScore,
    });
  }

  close() {
    this.props.history.goBack();
  }

  handleHostTeamGoalsChange(e) {
    this.setState({
      playerHostTeamGoals: e.target.value,
    });
  }

  handleVisitorTeamGoalsChange(e) {
    this.setState({
      playerVisitorTeamGoals: e.target.value,
    });
  }

  handleHostTeamShotsChange(e) {
    this.setState({
      playerHostTeamShots: e.target.value,
    });
  }

  handleVisitorTeamShotsChange(e) {
    this.setState({
      playerVisitorTeamShots: e.target.value,
    });
  }

  handleHostTeamShotsOnTargetChange(e) {
    this.setState({
      playerHostTeamShotsOnTarget: e.target.value,
    });
  }

  handleVisitorTeamShotsOnTargetChange(e) {
    this.setState({
      playerVisitorTeamShotsOnTarget: e.target.value,
    });
  }

  handleHostTeamCornersChange(e) {
    this.setState({
      playerHostTeamCorners: e.target.value,
    });
  }

  handleVisitorTeamCornersChange(e) {
    this.setState({
      playerVisitorTeamCorners: e.target.value,
    });
  }

  handleHostTeamYellowCardsChange(e) {
    this.setState({
      playerHostTeamYellowCards: e.target.value,
    });
  }

  handleVisitorTeamYellowCardsChange(e) {
    this.setState({
      playerVisitorTeamYellowCards: e.target.value,
    });
  }

  handleHostTeamRedCardsChange(e) {
    this.setState({
      playerHostTeamRedCards: e.target.value,
    });
  }

  handleVisitorTeamRedCardsChange(e) {
    this.setState({
      playerVisitorTeamRedCards: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    const { gameSetupId } = this.props.match.params;
    const playerGameAnalysisInfo = {
      gameSetupId: gameSetupId,
      playerHostScore: this.state.playerHostScore,
      playerVisitorScore: this.state.playerVisitorScore,
      playerHostTeamGoals: this.state.playerHostTeamGoals,
      playerVisitorTeamGoals: this.state.playerVisitorTeamGoals,
      playerHostTeamShots: this.state.playerHostTeamShots,
      playerVisitorTeamShots: this.state.playerVisitorTeamShots,
      playerHostTeamShotsOnTarget: this.state.playerHostTeamShotsOnTarget,
      playerVisitorTeamShotsOnTarget: this.state.playerVisitorTeamShotsOnTarget,
      playerHostTeamCorners: this.state.playerHostTeamCorners,
      playerVisitorTeamCorners: this.state.playerVisitorTeamCorners,
      playerHostTeamYellowCards: this.state.playerHostTeamYellowCards,
      playerVisitorTeamYellowCards: this.state.playerVisitorTeamYellowCards,
      playerHostTeamRedCards: this.state.playerHostTeamRedCards,
      playerVisitorTeamRedCards: this.state.playerVisitorTeamRedCards,
      playerWinner: (this.state.playerHostScore > this.state.playerVisitorScore) ? 'HOSTTEAM' : 'VISITORTEAM',
    };
    Meteor.call('player_game_analysis.create', playerGameAnalysisInfo, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
          PlayerGameAnalysisId: '',
        });
      } else {
        this.setState({
          feedbackMessage: 'Player Analysis Info Saved!',
          feedbackMessageType: 'success',
          PlayerGameAnalysisId: result,
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
    let savedAndDisabled = true;
    let saveBtnText = '';
    if (!this.state.PlayerGameAnalysisId) {
      saveBtnText = 'SUBMIT FINAL ANALYSIS';
      savedAndDisabled = false;
    } else {
      saveBtnText = 'ANALYSIS SUBMITTED!';
      savedAndDisabled = true;
    }
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
      <div id="player-analysis-editor-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <Button
                className="exit-btn"
                bsStyle="warning"
                bsSize="large"
                block
                onClick={this.close}
                data-toggle="confirmation"
              >
                x
              </Button>
              <div className="modal-header">
                <div className="text-center">Game Analysis Editor</div>
              </div>
              <div className="col-md-12 center-block alert-area">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
              </div>
              <form
                id="player-analysis-editor-form"
                className="form col-md-12 center-block"
                onSubmit={this.handleSubmit}
              >
              <div className="modal-body container">
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
                  <div className="game-row4 col-md-3 text-center">{this.state.playerHostScore}</div>
                  <div className="col-md-3 game-row6 text-center">Score</div>
                  <div className="game-row4 col-md-3 text-center">{this.state.playerVisitorScore}</div>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-goals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamGoals}
                    onChange={this.handleHostTeamGoalsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Goals</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-goals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamGoals}
                    onChange={this.handleVisitorTeamGoalsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-shots"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamShots}
                    onChange={this.handleHostTeamShotsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Shots</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-shots"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamShots}
                    onChange={this.handleVisitorTeamShotsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-shots-on-target"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamShotsOnTarget}
                    onChange={this.handleHostTeamShotsOnTargetChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center shots-on-target-label">Shots On Target</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-shots-on-target"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamShotsOnTarget}
                    onChange={this.handleVisitorTeamShotsOnTargetChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-corners"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamCorners}
                    onChange={this.handleHostTeamCornersChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Corners</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-corners"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamCorners}
                    onChange={this.handleVisitorTeamCornersChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-yellowcards"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamYellowCards}
                    onChange={this.handleHostTeamYellowCardsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Yellow cards</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-yellowcards"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamYellowCards}
                    onChange={this.handleVisitorTeamYellowCardsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-redcards"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamRedCards}
                    onChange={this.handleHostTeamRedCardsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Red cards</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-redcards"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamRedCards}
                    onChange={this.handleVisitorTeamRedCardsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <hr />
                <div className="form-group btn-area text-center col-md-12">
                  <Button
                    className="save-btn"
                    bsStyle="primary"
                    bsSize="large"
                    block
                    disabled={savedAndDisabled}
                    onClick={this.handleSubmit}
                  >
                    {saveBtnText}
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
