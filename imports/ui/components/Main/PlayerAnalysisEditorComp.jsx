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
      noOfPlayers: 0,
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      prevState.playerHostTeamTries !== this.state.playerHostTeamTries ||
      prevState.playerHostTeamDropgoals !== this.state.playerHostTeamDropgoals ||
      prevState.playerHostTeamConvs !== this.state.playerHostTeamConvs ||
      prevState.playerHostTeamPenalties !== this.state.playerHostTeamPenalties ||
      prevState.playerVisitorTeamTries !== this.state.playerVisitorTeamTries ||
      prevState.playerVisitorTeamConvs !== this.state.playerVisitorTeamConvs ||
      prevState.playerVisitorTeamPenalties !== this.state.playerVisitorTeamPenalties ||
      prevState.playerVisitorTeamDropgoals !== this.state.playerVisitorTeamDropgoals
    ) { this.calculateScores(); }
  }

  calculateScores() {
    let playerHostScore = 0;
    let playerVisitorScore = 0;
    playerHostScore += this.state.playerHostTeamTries * 5;
    playerHostScore += this.state.playerHostTeamDropgoals * 3;
    playerHostScore += this.state.playerHostTeamConvs * 2;
    playerHostScore += this.state.playerHostTeamPenalties * 3;
    playerVisitorScore += this.state.playerVisitorTeamTries * 5;
    playerVisitorScore += this.state.playerVisitorTeamConvs * 2;
    playerVisitorScore += this.state.playerVisitorTeamPenalties * 3;
    playerVisitorScore += this.state.playerVisitorTeamDropgoals * 3;
    this.setState({
      playerHostScore,
      playerVisitorScore,
    });
  }

  close() {
    this.props.history.goBack();
  }

  handleHostTeamTriesChange(e) {
    if (Number(e.target.value) < Number(this.state.playerHostTeamConvs)) {
      this.setState({
        playerHostTeamTries: e.target.value,
        playerHostTeamConvs: e.target.value,
      });
    } else {
      this.setState({
        playerHostTeamTries: e.target.value,
      });
    }
  }

  handleVisitorTeamTriesChange(e) {
    if (Number(e.target.value) < Number(this.state.playerVisitorTeamConvs)) {
      this.setState({
        playerVisitorTeamTries: e.target.value,
        playerVisitorTeamConvs: e.target.value,
      });
    } else {
      this.setState({
        playerVisitorTeamTries: e.target.value,
      });
    }
  }

  handleHostTeamConvsChange(e) {
    this.setState({
      playerHostTeamConvs: e.target.value,
    });
  }

  handleVisitorTeamConvsChange(e) {
    this.setState({
      playerVisitorTeamConvs: e.target.value,
    });
  }

  handleHostTeamPenaltiesChange(e) {
    this.setState({
      playerHostTeamPenalties: e.target.value,
    });
  }

  handleVisitorTeamPenaltiesChange(e) {
    this.setState({
      playerVisitorTeamPenalties: e.target.value,
    });
  }

  handleHostTeamDropgoalsChange(e) {
    this.setState({
      playerHostTeamDropgoals: e.target.value,
    });
  }

  handleVisitorTeamDropgoalsChange(e) {
    this.setState({
      playerVisitorTeamDropgoals: e.target.value,
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
    console.log('STATE:', this.state);
    const { gameSetupId } = this.props.match.params;
    const playerGameAnalysisInfo = {
      gameSetupId: gameSetupId,
      playerHostScore: this.state.playerHostScore,
      playerVisitorScore: this.state.playerVisitorScore,
      playerHostTeamTries: this.state.playerHostTeamTries,
      playerVisitorTeamTries: this.state.playerVisitorTeamTries,
      playerHostTeamConvs: this.state.playerHostTeamConvs,
      playerVisitorTeamConvs: this.state.playerVisitorTeamConvs,
      playerHostTeamPenalties: this.state.playerHostTeamPenalties,
      playerVisitorTeamPenalties: this.state.playerVisitorTeamPenalties,
      playerHostTeamDropgoals: this.state.playerHostTeamDropgoals,
      playerVisitorTeamDropgoals: this.state.playerVisitorTeamDropgoals,
      playerHostTeamYellowCards: this.state.playerHostTeamYellowCards,
      playerVisitorTeamYellowCards: this.state.playerVisitorTeamYellowCards,
      playerHostTeamRedCards: this.state.playerHostTeamRedCards,
      playerVisitorTeamRedCards: this.state.playerVisitorTeamRedCards,
      playerWinner: (this.state.playerHostScore > this.state.playerVisitorScore) ? 'HOSTTEAM' : 'VISITORTEAM',
    };
    Meteor.call('player_game_analysis.create', playerGameAnalysisInfo, (err, result) => {
      console.log('ERROR:', err);
      console.log('RESULT:', result);
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
    console.log('this.state:', this.state)
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
      return (i <= this.state.playerHostTeamTries);
    });
    const visitorConvsArr = noValuesArr.filter((val, i) => {
      return (i <= this.state.playerVisitorTeamTries);
    });
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
                    id="game-host-team-tries"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamTries}
                    onChange={this.handleHostTeamTriesChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Tries</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-tries"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamTries}
                    onChange={this.handleVisitorTeamTriesChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-convs"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamConvs}
                    onChange={this.handleHostTeamConvsChange}
                    disabled={savedAndDisabled}
                  >
                    {hostConvsArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Conversions</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-convs"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamConvs}
                    onChange={this.handleVisitorTeamConvsChange}
                    disabled={savedAndDisabled}
                  >
                    {visitorConvsArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-penalties"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamPenalties}
                    onChange={this.handleHostTeamPenaltiesChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Penalty kicks</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-penalties"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamPenalties}
                    onChange={this.handleVisitorTeamPenaltiesChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <select
                    name="form-field-name"
                    id="game-host-team-dropgoals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerHostTeamDropgoals}
                    onChange={this.handleHostTeamDropgoalsChange}
                    disabled={savedAndDisabled}
                  >
                    {noValuesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                  <div className="col-md-4 game-row1 text-center">Dropgoals</div>
                  <select
                    name="form-field-name"
                    id="game-visitor-team-dropgoals"
                    className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                    value={this.state.playerVisitorTeamDropgoals}
                    onChange={this.handleVisitorTeamDropgoalsChange}
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
