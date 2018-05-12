import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert } from 'react-bootstrap';
import moment from 'moment/moment';
import './MyTeamComp.less';

export default class MyTeamComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      downlineInfo: [],
    };
  }
  componentWillMount() {
    // Get user information from DB.
    Meteor.call('getDownLineDB', (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        // Load user information to REDUX store.
        this.setState({
          downlineInfo: result,
        });
      }
    });
  }
  render() {
    const { downlineInfo } = this.state;
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="my-team-comp">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8 my-team-area">
              <div className="col-md-6 offset-md-3">
                <h1 className="text-center">My Team</h1>
              </div>
              {(feedbackMessage) ?
                <Alert bsStyle={feedbackMessageType}>
                  {feedbackMessage}
                </Alert>
              : null }
              { downlineInfo.map((downline, i) => {
                const downlineInfoStr = `${i + 1})
                                    ${downline.firstName}
                                    ${downline.lastName}
                                    (${downline.clcNo})
                                    ${downline.cellNo}
                                    ${downline.emails[0].address}
                                    ${moment(downline.joinedDate).format('Do MMM YYYY')}`;
                return (
                  <h3 className="col-md-8 offset-md-2">
                    {downlineInfoStr}
                  </h3>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
