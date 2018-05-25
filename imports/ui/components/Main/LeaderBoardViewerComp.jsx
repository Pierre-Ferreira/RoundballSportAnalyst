import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import equal from 'deep-equal';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './LeaderBoardViewerComp.less';

export default class LeaderBoardViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameLeaderboard: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.gameLeaderboardInfo[0] && nextProps.gameLeaderboardInfo[0].gameLeaderboard
    ) {
      this.setState({
        gameLeaderboard: nextProps.gameLeaderboardInfo[0].gameLeaderboard,
      });
    }
  }

  render() {
    return (
      <div id="leader-board-viewer-comp">
        <div className="container leader-board-viewer-area">
          <div className="heading-row row justify-content-md-center">
            <div className="col-md-12 game-row8 text-center">Leaderboard</div>
          </div>
          <div className="heading-section-row row justify-content-md-center">
            <div className="col-md-2 game-row9 text-center">Pos</div>
            <div className="col-md-4 game-row9 text-center">Scores</div>
            <div className="col-md-6 game-row9 text-center">Username</div>
          </div>
          {this.state.gameLeaderboard.map((playerGameAnalysis, i) => {
            return (
              <div className="section-row row justify-content-md-center">
                <div className="col-md-2 game-row6 text-center">{i + 1})</div>
                <div className="col-md-4 game-row6 text-center">{playerGameAnalysis.playerScore}</div>
                <div className="col-md-6 game-row6 text-center">{playerGameAnalysis.username}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
