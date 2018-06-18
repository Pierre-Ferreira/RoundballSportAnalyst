import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import equal from 'deep-equal';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment'
import './PlayerScoreViewerComp.less';

export default class PlayerScoreViewerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCategoryDiff: {
        winnerTeam: 'N/A',
        winnerScore: 'N/A',
        winnerGoals: 'N/A',
        winnerShots: 'N/A',
        winnerShotsOnTarget: 'N/A',
        winnerCorners: 'N/A',
        winnerYellowCards: 'N/A',
        winnerRedCards: 'N/A',
        loserScore: 'N/A',
        loserGoals: 'N/A',
        loserShots: 'N/A',
        loserShotsOnTarget: 'N/A',
        loserCorners: 'N/A',
        loserYellowCards: 'N/A',
        loserRedCards: 'N/A',
      },
      playerCategoryLoss: {
        winnerTeam: 'N/A',
        winnerScore: 'N/A',
        winnerGoals: 'N/A',
        winnerShots: 'N/A',
        winnerShotsOnTarget: 'N/A',
        winnerCorners: 'N/A',
        winnerYellowCards: 'N/A',
        winnerRedCards: 'N/A',
        loserScore: 'N/A',
        loserGoals: 'N/A',
        loserShots: 'N/A',
        loserShotsOnTarget: 'N/A',
        loserCorners: 'N/A',
        loserYellowCards: 'N/A',
        loserRedCards: 'N/A',
      },
      playerScoreTotalLoss: 0,
      playerScore: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.playerGameScores[0] && (
        !equal(nextProps.playerGameScores[0].playerCategoryDiff, this.state.playerCategoryDiff) ||
        !equal(nextProps.playerGameScores[0].playerCategoryLoss, this.state.playerCategoryLoss) ||
        nextProps.playerGameScores[0].playerScoreTotalLoss !== this.state.playerScoreTotalLoss ||
        nextProps.playerGameScores[0].playerScore !== this.state.playerScore
      )
    ) {
      this.setState({
        playerCategoryDiff: nextProps.playerGameScores[0].playerCategoryDiff,
        playerCategoryLoss: nextProps.playerGameScores[0].playerCategoryLoss,
        playerScoreTotalLoss: nextProps.playerGameScores[0].playerScoreTotalLoss,
        playerScore: nextProps.playerGameScores[0].playerScore,
      });
    }
  }

  render() {
    const scoreFactors = {
      winnerTeam: -3000,
      // winnerScore: -500,
      // loserScore: -500,
      winnerGoals: -500,
      loserGoals: -500,
      winnerShots: -50,
      loserShots: -50,
      winnerShotsOnTarget: -100,
      loserShotsOnTarget: -100,
      winnerCorners: -150,
      loserCorners: -150,
      winnerYellowCards: -300,
      loserYellowCards: -300,
      winnerRedCards: -400,
      loserRedCards: -400,
    };
    return (
      <div id="player-score-viewer-comp">
        <div className="container player-score-viewer-area">
          <div className="heading-row row justify-content-md-center">
            <div className="col-md-8 game-row8 text-center">Your Score: {this.state.playerScore}</div>
            <div className="col-md-4 game-row10 text-center"> (=10000{this.state.playerScoreTotalLoss})</div>
          </div>
          <div className="heading-section-row row justify-content-md-center">
            <div className="col-md-4 game-row9 text-center">Cat</div>
            <div className="col-md-2 game-row9 text-center">Diff</div>
            <div className="col-md-3 game-row9 text-center">Factor</div>
            <div className="col-md-3 game-row9 text-center">Loss</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerTeam}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerTeam}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerTeam}</div>
          </div>
          {/* <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Score:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerScore}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerScore}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerScore}</div>
          </div> */}
          {/* <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Score:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserScore}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserScore}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserScore}</div>
          </div> */}
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerGoals}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerGoals}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerGoals}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserGoals}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserGoals}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserGoals}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Shots:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerShots}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerShots}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerShots}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Shots:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserShots}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserShots}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserShots}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner Pens:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerShotsOnTarget}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerShotsOnTarget}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerShotsOnTarget}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser Pens:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserShotsOnTarget}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserShotsOnTarget}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserShotsOnTarget}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Winner D/goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.winnerCorners}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.winnerCorners}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.winnerCorners}</div>
          </div>
          <div className="section-row row justify-content-md-center">
            <div className="col-md-4 game-row6 text-center">Loser D/goals:</div>
            <div className="col-md-2 game-row6 text-center">{this.state.playerCategoryDiff.loserCorners}</div>
            <div className="col-md-3 game-row6 text-center">{scoreFactors.loserCorners}</div>
            <div className="col-md-3 game-row6 text-center">{this.state.playerCategoryLoss.loserCorners}</div>
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
          </div>
        </div>
      </div>
    );
  }
}
