import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import GameRunningViewerContainer from '../../containers/Main/GameRunningViewerContainer';
import PlayerAnalysisViewerComp from './PlayerAnalysisViewerComp';
import './MainStatsViewerComp.less';

export default class MainStatsViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: 'danger',
      playerGameAnalysisId: '',
      gameRunningStatsId: '',
      gameSetupId: '',
      // playerHostTeamTries: '0',
      // playerVisitorTeamTries: '0',
      // playerHostTeamConvs: '0',
      // playerVisitorTeamConvs: '0',
      // playerHostTeamPenalties: '0',
      // playerVisitorTeamPenalties: '0',
      // playerHostTeamDropgoals: '0',
      // playerVisitorTeamDropgoals: '0',
      // playerHostTeamYellowCards: '0',
      // playerVisitorTeamYellowCards: '0',
      // playerHostTeamRedCards: '0',
      // playerVisitorTeamRedCards: '0',
      // playerHostScore: 0,
      // playerVisitorScore: 0,
      // playerWinner: '',
    };
    this.close = this.close.bind(this);
  };

  componentWillMount() {
    const { gameSetupId } = this.props.match.params;
    // Meteor.call('game_setup.fetch', gameSetupId, (err, result) => {
    //   if (err) {
    //     this.setState({
    //       feedbackMessage: err.reason,
    //       feedbackMessageType: 'danger',
    //     });
    //   } else {
    //     this.setState({
    //       gameSetupInfo: result,
    //     });
    //     Meteor.call('player_game_analysis.fetch', gameSetupId, (err, result) => {
    //       if (err) {
    //         this.setState({
    //           feedbackMessage: err.reason,
    //           feedbackMessageType: 'danger',
    //         });
    //       } else {
    //         if (result) {
    //           this.setState({
    //             PlayerGameAnalysisId: result._id,
    //             playerHostScore: result.playerHostScore,
    //             playerVisitorScore: result.playerVisitorScore,
    //             playerHostTeamTries: result.playerHostTeamTries,
    //             playerVisitorTeamTries: result.playerVisitorTeamTries,
    //             playerHostTeamConvs: result.playerHostTeamConvs,
    //             playerVisitorTeamConvs: result.playerVisitorTeamConvs,
    //             playerHostTeamPenalties: result.playerHostTeamPenalties,
    //             playerVisitorTeamPenalties: result.playerVisitorTeamPenalties,
    //             playerHostTeamDropgoals: result.playerHostTeamDropgoals,
    //             playerVisitorTeamDropgoals: result.playerVisitorTeamDropgoals,
    //             playerHostTeamYellowCards: result.playerHostTeamYellowCards,
    //             playerVisitorTeamYellowCards: result.playerVisitorTeamYellowCards,
    //             playerHostTeamRedCards: result.playerHostTeamRedCards,
    //             playerVisitorTeamRedCards: result.playerVisitorTeamRedCards,
    //           });
    //         }
    //       }
    //     });
    //   }
    // });
  }

  close() {
    this.props.history.goBack();
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="main-stats-viewer-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <Button
                className="exit-btn"
                bsStyle="warning"
                bsSize="large"
                block
                onClick={this.close}
              >
                X
              </Button>
              <div className="modal-header">
                <div className="text-center">Game Stats Viewer</div>
              </div>
              {/* <div className="col-md-12 center-block alert-area">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
              </div> */}
              <div className="modal-body container col-md-12 row">
                <div className="text-center left-panels col-md-4">
                  <div className="text-center left-panel-top">
                    <PlayerAnalysisViewerComp {...this.props} />
                  </div>
                  <div className="text-center left-panel-bottom">
                    left-panel-bottom
                  </div>
                </div>
                <div className="text-center center-panels col-md-5">
                  <GameRunningViewerContainer {...this.props} />
                </div>
                <div className="text-center right-panels col-md-3">
                  right-panels
                </div>
              </div>
              <div className="btn-area text-center col-md-12">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
