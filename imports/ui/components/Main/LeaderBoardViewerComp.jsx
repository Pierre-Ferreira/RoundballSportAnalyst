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
      allGameScores: [],
      // playerCategoryDiff: {
      //   winnerTeam: 'N/A',
      //   winnerScore: 'N/A',
      //   winnerTries: 'N/A',
      //   winnerConvs: 'N/A',
      //   winnerPenalties: 'N/A',
      //   winnerDropgoals: 'N/A',
      //   winnerYellowCards: 'N/A',
      //   winnerRedCards: 'N/A',
      //   loserScore: 'N/A',
      //   loserTries: 'N/A',
      //   loserConvs: 'N/A',
      //   loserPenalties: 'N/A',
      //   loserDropgoals: 'N/A',
      //   loserYellowCards: 'N/A',
      //   loserRedCards: 'N/A',
      // },
      // playerCategoryLoss: {
      //   winnerTeam: 'N/A',
      //   winnerScore: 'N/A',
      //   winnerTries: 'N/A',
      //   winnerConvs: 'N/A',
      //   winnerPenalties: 'N/A',
      //   winnerDropgoals: 'N/A',
      //   winnerYellowCards: 'N/A',
      //   winnerRedCards: 'N/A',
      //   loserScore: 'N/A',
      //   loserTries: 'N/A',
      //   loserConvs: 'N/A',
      //   loserPenalties: 'N/A',
      //   loserDropgoals: 'N/A',
      //   loserYellowCards: 'N/A',
      //   loserRedCards: 'N/A',
      // },
      // playerScoreTotalLoss: 0,
      // playerScore: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.allGameScores:',nextProps.allGameScores)
    console.log('this.state:',this.state)
    this.setState({
      allGameScores: nextProps.allGameScores,
    });
  }

  render() {
    // const scoreFactors = {
    //   winnerTeam: -1000,
    //   winnerScore: -20,
    //   loserScore: -20,
    //   winnerTries: -50,
    //   loserTries: -50,
    //   winnerConvs: -50,
    //   loserConvs: -50,
    //   winnerPenalties: -100,
    //   loserPenalties: -100,
    //   winnerDropgoals: -150,
    //   loserDropgoals: -150,
    //   winnerYellowCards: -150,
    //   loserYellowCards: -150,
    //   winnerRedCards: -200,
    //   loserRedCards: -200,
    // };
    return (
      <div id="leader-board-viewer-comp">
        <div className="container leader-board-viewer-area">
          <div className="heading-row row justify-content-md-center">
            <div className="col-md-12 game-row8 text-center">Leaderboard</div>
          </div>
          <div className="heading-section-row row justify-content-md-center">
            <div className="col-md-2 game-row9 text-center">Pos</div>
            <div className="col-md-4 game-row9 text-center">Scores</div>
            <div className="col-md-4 game-row9 text-center">Username</div>
            <div className="col-md-2 game-row9 text-center">UserId</div>
          </div>
          {this.state.allGameScores.map((playerGameAnalysis, i) => {
            return (
              <div className="section-row row justify-content-md-center">
                <div className="col-md-2 game-row6 text-center">{i + 1})</div>
                <div className="col-md-4 game-row6 text-center">{playerGameAnalysis.playerScore}</div>
                <div className="col-md-4 game-row6 text-center">({playerGameAnalysis.username})</div>
                <div className="col-md-2 game-row6 text-center">({playerGameAnalysis.userId})</div>
              </div>
            );
          })}
          {/* <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Score:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerScore}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerScore}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerScore}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Score:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserScore}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserScore}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserScore}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Tries:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerTries}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerTries}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerTries}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Tries:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserTries}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserTries}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserTries}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Convs:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerConvs}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerConvs}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerConvs}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Convs:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserConvs}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserConvs}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserConvs}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Pens:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerPenalties}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerPenalties}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerPenalties}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Pens:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserPenalties}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserPenalties}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserPenalties}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner D/goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerDropgoals}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser D/goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserDropgoals}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserDropgoals}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Yellows:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerYellowCards}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Yellows:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserYellowCards}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserYellowCards}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Reds:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerRedCards}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerRedCards}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerRedCards}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Reds:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserRedCards}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserRedCards}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserRedCards}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center"></div>
            <div className="col-md-2 game-row6 text-center"></div>
            <div className="col-md-3 game-row6 text-center"></div>
            <div className="col-md-3 game-row11 text-center">______</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center"></div>
            <div className="col-md-2 game-row6 text-center"></div>
            <div className="col-md-3 game-row6 text-center">TOTAL LOSS:</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerScoreTotalLoss}</div>
          </div> */}
        </div>
      </div>
    );
  }
}
