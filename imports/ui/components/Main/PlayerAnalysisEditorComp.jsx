import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerAnalysisEditorComp.less';

export default class PlayerAnalysisEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      // gameSetupId: '',
      // gameSequenceNo: '',
      // gameDateDay: '',
      // gameDateMonth: '',
      // gameDateYear: '',
      // gameKickoff: '',
      // gameVenue: '',
      // gameCity: '',
      // gameHostTeam: '',
      // gameHostAlias: '',
      // gameVisitorTeam: '',
      // gameVisitorAlias: '',
      // gameActive: true,
      gameHostTeamTries: 0,
      gameVisitorTeamTries: 0,
    };
    this.close = this.close.bind(this);
    // this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVisitorTeamChange = this.handleVisitorTeamChange.bind(this);
    this.handleHostTeamChange = this.handleHostTeamChange.bind(this);
    this.handleGameActiveChange = this.handleGameActiveChange.bind(this);
    // this.newGame = this.newGame.bind(this);
    this.handleGameSetupChange = this.handleGameSetupChange.bind(this);
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
    const { gameId } = this.props.match.params;
    Meteor.call('game_setup.fetch', gameId, (err, result) => {
      if (err) {
        console.log('game_setup.fetch ERR:', err)
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('game_setup.fetch RESULT:', result)
        this.setState({
          gameSetupInfo: result,
        });
      }
    });
  }

  // onChangeInput() {
  //   const gameDateDay = document.getElementById('game-date-day').value.trim();
  //   const gameDateMonth = document.getElementById('game-date-month').value.trim();
  //   const gameDateYear = document.getElementById('game-date-year').value.trim();
  //   const gameKickoff = document.getElementById('game-kickoff').value.trim();
  //   const gameVenue = document.getElementById('game-venue').value.trim();
  //   const gameCity = document.getElementById('game-city').value.trim();
  //   const gameHostAlias = document.getElementById('game-host-alias').value.trim();
  //   const gameVisitorAlias = document.getElementById('game-visitor-alias').value.trim();
  //
  //   this.setState({
  //     gameDateDay,
  //     gameDateMonth,
  //     gameDateYear,
  //     gameKickoff,
  //     gameVenue,
  //     gameCity,
  //     gameHostAlias,
  //     gameVisitorAlias,
  //   });
  // }


  close() {
    this.props.history.goBack();
  }

  handleHostTeamChange(e) {
    this.setState({
      gameHostTeam: e.target.value,
      gameHostAlias: e.target.value,
    });
  }

  handleVisitorTeamChange(e) {
    this.setState({
      gameVisitorTeam: e.target.value,
      gameVisitorAlias: e.target.value,
    });
  }

  handleGameActiveChange(e) {
    let val = e.target.value;
    val = (val === 'false') ? true : false;
    this.setState({
      gameActive: val,
    });
  }

  handleHostTeamTriesChange(e) {
    this.setState({
      gameHostTeamTries: e.target.value,
    });
  }

  handleVisitorTeamTriesChange(e) {
    this.setState({
      gameVisitorTeamTries: e.target.value,
    });
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    console.log('STATE:', this.state);
    if (!this.state.gameDateYear || !this.state.gameDateMonth || !this.state.gameDateDay) {
      this.setState({
        feedbackMessage: 'ERROR: Game Date is required',
        feedbackMessageType: 'danger',
      });
      return
    }
    const gameDate = new Date(
      this.state.gameDateYear,
      this.state.gameDateMonth - 1,
      this.state.gameDateDay,
      12,
      0,
      0,
    );
    console.log('gameDate:',gameDate)
    if (!moment(gameDate).isValid()) {
      this.setState({
        feedbackMessage: 'ERROR: Date is not valid',
        feedbackMessageType: 'danger',
      });
      return;
    }

    const gameInfo = {
      gameDate,
      gameKickoff: this.state.gameKickoff,
      gameVenue: this.state.gameVenue,
      gameCity: this.state.gameCity,
      gameHostTeam: this.state.gameHostTeam,
      gameHostAlias: this.state.gameHostAlias,
      gameVisitorTeam: this.state.gameVisitorTeam,
      gameVisitorAlias: this.state.gameVisitorAlias,
      gameActive: this.state.gameActive,
      gameSequenceNo: this.state.gameSequenceNo || this.props.GamesSetupList.length + 1,
      createdAt: this.props.createdAt || new Date(),
    };
    if (this.state.gameSetupId) {
      Meteor.call('game_setup.update', this.state.gameSetupId, gameInfo, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Game Info Saved!',
            feedbackMessageType: 'success',
          });
          // this.newGame();
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    } else {
      Meteor.call('game_setup.create', gameInfo, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Game Info Saved!',
            feedbackMessageType: 'success',
          });
          this.newGame();
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    }
  }

  handleGameSetupChange(e) {
    const selectedGameSetupId = e.target.value;
    let selectedGameSetupInfo = '';
    this.props.GamesSetupList.forEach((gameItem) => {
      if (selectedGameSetupId === gameItem._id) {
        selectedGameSetupInfo = gameItem;
      }
    });
    const gameDateDay = selectedGameSetupInfo.gameDate.getDate();
    const gameDateMonth = selectedGameSetupInfo.gameDate.getMonth() + 1;
    const gameDateYear = selectedGameSetupInfo.gameDate.getFullYear();
    this.setState({
      gameSetupId: selectedGameSetupId,
      gameSequenceNo: selectedGameSetupInfo.gameSequenceNo,
      gameDateDay,
      gameDateMonth,
      gameDateYear,
      gameKickoff: selectedGameSetupInfo.gameKickoff,
      gameVenue: selectedGameSetupInfo.gameVenue,
      gameCity: selectedGameSetupInfo.gameCity,
      gameHostTeam: selectedGameSetupInfo.gameHostTeam,
      gameHostAlias: selectedGameSetupInfo.gameHostAlias,
      gameVisitorTeam: selectedGameSetupInfo.gameVisitorTeam,
      gameVisitorAlias: selectedGameSetupInfo.gameVisitorAlias,
      gameActive: selectedGameSetupInfo.gameActive,
    });
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    const gameSequenceNo = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameSequenceNo : 'Loading...';
    const gameDate = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameDate : 'Loading...';
    const gameHostTeam = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameHostTeam : 'Loading...';
    const gameVisitorTeam = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVisitorTeam : 'Loading...';
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
    const gameHostScore = 99;
    const gameVisitorScore = 85;
    return (
      <div id="player-analysis-editor-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <div className="text-center">Game Analysis Editor</div>
                <div className="text-center game-row1">Game #{gameSequenceNo} (193/200)</div>
              </div>
              {(feedbackMessage) ?
                <Alert bsStyle={feedbackMessageType}>
                  {feedbackMessage}
                </Alert>
              : null }
              <form
                id="player-analysis-editor-form"
                className="form col-md-12 center-block"
                onSubmit={this.handleSubmit}
              >
              <div className="modal-body container">
                <div className="text-center">
                  <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')}</div>
                  <div className="game-row2">{gameVenue}</div>
                  <div className="game-row2">{gameCity}</div>
                  <div className="game-row3">({gameKickoff})</div>
                  <div className="game-row4">{gameHostTeam} <span className="game-vs">vs</span> {gameVisitorTeam}</div>
                </div>
                <div className="section-row form-group row justify-content-md-center">
                  <div className="game-row4 col-md-2">{gameHostScore}</div>
                  <div className="col-md-4 game-row1 text-center">Score</div>
                  <div className="game-row4 col-md-2">{gameVisitorScore}</div>
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
                <div className="form-group save-btn-area text-center col-md-12">
                  <input
                    type="submit"
                    id="game-setup-editor-form-save"
                    className="btn btn-primary btn-lg btn-block"
                    value="SAVE"
                  />
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
