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

  componentWillUnmount() {
    // console.log('subscriptionId BEF:', this.props.handle.subscriptionId)
    // const test = this.props.handle.stop();
    // console.log('subscriptionId AFT:', this.props.handle.subscriptionId)
    // Meteor.unsubscribe(this.props.handle)
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

              <div className="modal-body container">
                <div>
                  <div className="game-row1">Game #{gameSequenceNo} (193/200)</div>
                  <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')}</div>
                  <div className="game-row1">{gameHostAlias} <span className='game-vs'>vs</span> {gameVisitorAlias}</div>
                  <div className="game-row2">{gameVenue}</div>
                  <div className="game-row2">{gameCity}</div>
                  <div className="game-row3">({gameKickoff})</div>
                </div>
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
