import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerAnalysisViewerComp.less';

export default class PlayerAnalysisViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.close = this.close.bind(this);
  }

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
            } else {
              this.setState({
                PlayerGameAnalysisId: 'N/A',
                playerHostScore: 'N/A',
                playerVisitorScore: 'N/A',
                playerHostTeamTries: 'N/A',
                playerVisitorTeamTries: 'N/A',
                playerHostTeamConvs: 'N/A',
                playerVisitorTeamConvs: 'N/A',
                playerHostTeamPenalties: 'N/A',
                playerVisitorTeamPenalties: 'N/A',
                playerHostTeamDropgoals: 'N/A',
                playerVisitorTeamDropgoals: 'N/A',
                playerHostTeamYellowCards: 'N/A',
                playerVisitorTeamYellowCards: 'N/A',
                playerHostTeamRedCards: 'N/A',
                playerVisitorTeamRedCards: 'N/A',
              });
            }
          }
        });
      }
    });
  }

  close() {
    this.props.history.goBack();
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    const gameHostAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameHostAlias : 'Loading...';
    const gameVisitorAlias = this.state.gameSetupInfo ? this.state.gameSetupInfo.gameVisitorAlias : 'Loading...';
    return (
      <div id="player-analysis-viewer-comp">
        <div className="container player-analysis-viewer-area">
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row8 col-md-12 text-center">Your Analysis</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row5 col-md-5 text-center">{gameHostAlias}</div>
            <span className="game-vs  col-md-2 text-center"></span>
            <div className="game-row5 col-md-5 text-center">{gameVisitorAlias}</div>
          </div>
          <div className="section-row form-group-2 row justify-content-md-center">
            <div className="game-row4 col-md-3 text-center">{this.state.playerHostScore}</div>
            <div className="col-md-4 game-row6 text-center">Score</div>
            <div className="game-row4 col-md-3 text-center">{this.state.playerVisitorScore}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamTries}</div>
            <div className="col-md-6 game-row1 text-center">Tries</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamTries}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamConvs}</div>
            <div className="col-md-6 game-row1 text-center">Conversions</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamConvs}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamPenalties}</div>
            <div className="col-md-6 game-row1 text-center">Penalty kicks</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamPenalties}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamDropgoals}</div>
            <div className="col-md-6 game-row1 text-center">Dropgoals</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamDropgoals}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamYellowCards}</div>
            <div className="col-md-6 game-row1 text-center">Yellow cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamYellowCards}</div>
          </div>
          <hr />
          <div className="section-row form-group row justify-content-md-center">
            <div className="col-md-3 game-row7 text-center">{this.state.playerHostTeamRedCards}</div>
            <div className="col-md-6 game-row1 text-center">Red cards</div>
            <div className="col-md-3 game-row7 text-center">{this.state.playerVisitorTeamRedCards}</div>
          </div>
        </div>
      </div>
    );
  }
}
