import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import './gameSetupEditorComp.less';

export default class gameSetupEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
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
  }

  onChangeInput() {
    const gameDateDay = document.getElementById('game-date-day').value.trim();
    const gameDateMonth = document.getElementById('game-date-month').value.trim();
    const gameDateYear = document.getElementById('game-date-year').value.trim();
    const gameKickoff = document.getElementById('game-kickoff').value.trim();
    const gameVenue = document.getElementById('game-venue').value.trim();
    const gameCity = document.getElementById('game-city').value.trim();
    const gameHostTeam = document.getElementById('game-host-team').value.trim();
    const gameHostAlias = document.getElementById('game-host-alias').value.trim();
    const gameVisitorTeam = document.getElementById('game-visitor-team').value.trim();
    const gameVisitorAlias = document.getElementById('game-visitor-alias').value.trim();
    const gameActive = document.getElementById('game-active').value.trim();

    this.setState({
      gameDateDay,
      gameDateMonth,
      gameDateYear,
      gameKickoff,
      gameVenue,
      gameCity,
      gameHostTeam,
      gameHostAlias,
      gameVisitorTeam,
      gameVisitorAlias,
      gameActive,
    });
  }

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
    console.log('e.target.value:',e.target.value)
    this.setState({
      gameActive: !(e.target.value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    console.log('STATE:', this.state)
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="game-setup-editor-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" size="lg" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <div className="text-center">Game Setup Editor</div>
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
                        <option value="Bulls">Bulls</option>
                        <option value="Crusaders">Crusaders</option>
                        <option value="Lions">Lions</option>
                        <option value="Stormers">Stormers</option>
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
                        <option value="Bulls">Bulls</option>
                        <option value="Crusaders">Crusaders</option>
                        <option value="Lions">Lions</option>
                        <option value="Stormers">Stormers</option>
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
                  <div className="form-group text-center col-md-12">
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
