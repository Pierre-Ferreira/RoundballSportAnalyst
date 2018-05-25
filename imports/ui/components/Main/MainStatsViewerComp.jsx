import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import GameRunningViewerContainer from '../../containers/Main/GameRunningViewerContainer';
import PlayerAnalysisViewerComp from './PlayerAnalysisViewerComp';
import PlayerScoreViewerContainer from '../../containers/Main/PlayerScoreViewerContainer';
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
    };
    this.close = this.close.bind(this);
  };

  componentWillMount() {
    const { gameSetupId } = this.props.match.params;
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
              <div className="modal-body container col-md-12 row">
                <div className="text-center left-panels col-md-4">
                  <div className="text-center left-panel-top">
                    <PlayerAnalysisViewerComp {...this.props} />
                  </div>
                  <div className="text-center left-panel-bottom">
                    <PlayerScoreViewerContainer {...this.props} />
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
