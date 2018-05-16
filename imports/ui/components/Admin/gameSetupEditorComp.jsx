import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './gameSetupEditorComp.less';

export default class gameSetupEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      gameSetupId: '',
      gameSequenceNo: '',
      gameDateDay: '',
      gameDateMonth: '',
      gameDateYear: '',
      gameKickoff: '',
      gameVenue: '',
      gameCity: '',
      gameHostTeam: '',
      gameHostAlias: '',
      gameVisitorTeam: '',
      gameVisitorAlias: '',
      gameActive: true,
    };
    this.close = this.close.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVisitorTeamChange = this.handleVisitorTeamChange.bind(this);
    this.handleHostTeamChange = this.handleHostTeamChange.bind(this);
    this.handleGameActiveChange = this.handleGameActiveChange.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleGameSetupChange = this.handleGameSetupChange.bind(this);
  }

  onChangeInput() {
    const gameDateDay = document.getElementById('game-date-day').value.trim();
    const gameDateMonth = document.getElementById('game-date-month').value.trim();
    const gameDateYear = document.getElementById('game-date-year').value.trim();
    const gameKickoff = document.getElementById('game-kickoff').value.trim();
    const gameVenue = document.getElementById('game-venue').value.trim();
    const gameCity = document.getElementById('game-city').value.trim();
    const gameHostAlias = document.getElementById('game-host-alias').value.trim();
    const gameVisitorAlias = document.getElementById('game-visitor-alias').value.trim();

    this.setState({
      gameDateDay,
      gameDateMonth,
      gameDateYear,
      gameKickoff,
      gameVenue,
      gameCity,
      gameHostAlias,
      gameVisitorAlias,
    });
  }

  close() {
    this.props.history.goBack();
  }

  newGame() {
    this.setState({
      gameSetupId: '',
      gameSequenceNo: '',
      gameDateDay: '',
      gameDateMonth: '',
      gameDateYear: '',
      gameKickoff: '',
      gameVenue: '',
      gameCity: '',
      gameHostTeam: '',
      gameHostAlias: '',
      gameVisitorTeam: '',
      gameVisitorAlias: '',
      gameActive: true,
    });
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
    })
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
    const gameSequenceNo = this.state.gameSequenceNo || this.props.GamesSetupList.length + 1;
    return (
      <div id="game-setup-editor-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <div className="text-center">Game Setup Editor</div>
              </div>
              <div className="select-game-area">
                <select
                  name="gameSelectField"
                  id="game-select-field"
                  className="form-control input-lg col-md-12 select-dropdown-fields"
                  value={this.state.gameSetupId}
                  onChange={this.handleGameSetupChange}
                >
                  <option value="">Select..</option>
                  {this.props.GamesSetupList.map((listItem, i) => {
                    const gameDateTime = `${moment(listItem.gameDate).format('DD-MM-YYYY')} ${listItem.gameKickoff}`;
                    const displayStr = `${listItem.gameHostTeam} vs ${listItem.gameVisitorTeam} (${gameDateTime}) Game #${listItem.gameSequenceNo}`;
                    return (<option value={listItem._id}>{displayStr}</option>)
                  })}
                </select>
                <Button className="new-button" bsSize="large" block onClick={this.newGame}>New Game</Button>
                <hr />
              </div>
              <div className="modal-body container">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
                <form
                  id="game-setup-editor-form"
                  className="form col-md-12 center-block"
                  onSubmit={this.handleSubmit}
                >
                  <div className='modal-scroll-area'>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Game No:</div>
                      <div className="col-md-6 field-headers">{gameSequenceNo}</div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Game Date:</div>
                      <input
                        type="text"
                        id="game-date-day"
                        className="form-control input-lg col-md-1"
                        placeholder="DD"
                        value={this.state.gameDateDay}
                        onChange={this.onChangeInput}
                      />
                      <span className="col-md-1">-</span>
                      <input
                        type="text"
                        id="game-date-month"
                        className="form-control input-lg col-md-1"
                        placeholder="MM"
                        value={this.state.gameDateMonth}
                        onChange={this.onChangeInput}
                      />
                      <span className="col-md-1">-</span>
                      <input
                        type="text"
                        id="game-date-year"
                        className="form-control input-lg col-md-2"
                        placeholder="YYYY"
                        value={this.state.gameDateYear}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Kickoff:</div>
                      <input
                        type="text"
                        id="game-kickoff"
                        className="form-control input-lg col-md-6"
                        placeholder="kickoff"
                        value={this.state.gameKickoff}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Venue:</div>
                      <input
                        type="text"
                        id="game-venue"
                        className="form-control input-lg col-md-6"
                        placeholder="venue"
                        value={this.state.gameVenue}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">City:</div>
                      <input
                        type="text"
                        id="game-city"
                        className="form-control input-lg col-md-6"
                        placeholder="city"
                        value={this.state.gameCity}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Host Team:</div>
                      <select
                        name="form-field-name"
                        id="game-host-team"
                        className="form-control input-lg col-md-6 select-dropdown-fields"
                        value={this.state.gameHostTeam}
                        onChange={this.handleHostTeamChange}
                      >
                        <option value="">Select..</option>
                        <option value="Blues">Blues</option>
                        <option value="Brumbies">Brumbies</option>
                        <option value="Bulls">Bulls</option>
                        <option value="Chiefs">Chiefs</option>
                        <option value="Crusaders">Crusaders</option>
                        <option value="Highlanders">Highlanders</option>
                        <option value="Hurricanes">Hurricanes</option>
                        <option value="Jaguares">Jaguares</option>
                        <option value="Lions">Lions</option>
                        <option value="Rebels">Rebels</option>
                        <option value="Reds">Reds</option>
                        <option value="Sharks">Sharks</option>
                        <option value="Stormers">Stormers</option>
                        <option value="Sunwolves">Sunwolves</option>
                        <option value="Waratahs">Waratahs</option>
                      </select>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Host Alias:</div>
                      <input
                        type="text"
                        id="game-host-alias"
                        className="form-control input-lg col-md-6"
                        placeholder="host alias"
                        value={this.state.gameHostAlias}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Visitor Team:</div>
                      <select
                        name="form-field-name"
                        id="game-visitor-team"
                        className="form-control input-lg col-md-6 select-dropdown-fields"
                        value={this.state.gameVisitorTeam}
                        onChange={this.handleVisitorTeamChange}
                      >
                        <option value="">Select..</option>
                        <option value="Blues">Blues</option>
                        <option value="Brumbies">Brumbies</option>
                        <option value="Bulls">Bulls</option>
                        <option value="Chiefs">Chiefs</option>
                        <option value="Crusaders">Crusaders</option>
                        <option value="Highlanders">Highlanders</option>
                        <option value="Hurricanes">Hurricanes</option>
                        <option value="Jaguares">Jaguares</option>
                        <option value="Lions">Lions</option>
                        <option value="Rebels">Rebels</option>
                        <option value="Reds">Reds</option>
                        <option value="Sharks">Sharks</option>
                        <option value="Stormers">Stormers</option>
                        <option value="Sunwolves">Sunwolves</option>
                        <option value="Waratahs">Waratahs</option>
                      </select>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Visitor Alias:</div>
                      <input
                        type="text"
                        id="game-visitor-alias"
                        className="form-control input-lg col-md-6"
                        placeholder="visitor alias"
                        value={this.state.gameVisitorAlias}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5 field-headers">Active:</div>
                      <input
                        type="checkbox"
                        id="game-active"
                        className="form-control input-lg col-md-1"
                        onChange={this.handleGameActiveChange}
                        value={this.state.gameActive}
                        checked={this.state.gameActive}
                      />
                    </div>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
