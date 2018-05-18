import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import './GameCurrentPrizesComp.less';

export default class GameCurrentPrizesComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      downlineInfo: [],
    };
  }
  componentWillMount() {
    // const { noOfPlayers } = this.props
    const noOfPlayers = 134;
    // Get prizes information from DB.
    Meteor.call('prize_monies.lookup', noOfPlayers, (err, result) => {
      if (err) {
        console.log('ERR:', err)
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('RESULT:', result)
        this.setState({
          prizesMoniesInfo: result,
        });
      }
    });
  }
  render() {
    const { gameSequenceNo, noOfPlayers } = this.props;
    const { prizesMoniesInfo, feedbackMessage, feedbackMessageType } = this.state;
    console.log('prizesMoniesInfo:', prizesMoniesInfo);
    let firstPrize = 'Loading..';
    let secondPrize = 'Loading..';
    let thirdPrize = 'Loading..';
    let nextTenPrizes = 'Loading..';
    if (prizesMoniesInfo) {
      firstPrize = prizesMoniesInfo.firstPrize;
      secondPrize = prizesMoniesInfo.secondPrize;
      thirdPrize = prizesMoniesInfo.thirdPrize;
      nextTenPrizes = prizesMoniesInfo.nextTenPrizes;
    }
    return (
      <div id="game-current-prizes-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <div className="text-center">Game#{gameSequenceNo} Prizes for {noOfPlayers} players</div>
              </div>
              <div className="modal-body container">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
                1st Prize: {firstPrize}
                2nd Prize: {secondPrize}
                3rd Prize: {thirdPrize}
                4 to 14 Prizes: {nextTenPrizes}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
