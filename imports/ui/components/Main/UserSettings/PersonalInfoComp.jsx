import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import './PersonalInfoComp.less';

export default class PersonalInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      firstName: '',
      lastName: '',
      cellNo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentWillMount() {
    this.setState({
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      cellNo: this.props.userInfo.cellNo,
    });

    let introducerInfoStr = '';
    Meteor.call('getIntroducerInfoDB', this.props.userInfo.introducersUserId, (err, result) => {
      if (err) {
        introducerInfoStr = `ERR: ${err.reason}`;
        console.log('introducerInfoStr:', introducerInfoStr)
      } else {
        introducerInfoStr = `${result[0].firstName} ${result[0].lastName} (${result[0].clcNo})`;
        console.log('introducerInfoStr:', introducerInfoStr)
        this.setState({
          introducerInfoStr,
        })
      }
    });
  }

  onChangeInput() {
    const firstName = document.getElementById('personal-info-firstname').value;
    const lastName = document.getElementById('personal-info-surname').value;
    const cellNo = document.getElementById('personal-info-cellno').value;
    this.setState({
      firstName,
      lastName,
      cellNo,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    let {
      firstName,
      lastName,
      cellNo,
    } = this.state;
    firstName = firstName.trim();
    lastName = lastName.trim();
    cellNo = cellNo.trim();
    const personalInfo = {
      firstName,
      lastName,
      cellNo,
    };
    Meteor.call('updateUserPersonalInfo', personalInfo, (err, result) => {
      if (err) {
        console.log('updateUserPersonalInfo ERR:', err);
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('updateUserPersonalInfo:', result);
        this.setState({
          feedbackMessage: 'Personal Info Saved!',
          feedbackMessageType: 'success',
        });
        this.props.saveUserPersonalInfoState(personalInfo);
        setTimeout(() => {
          this.setState({
            feedbackMessage: '',
            feedbackMessageType: '',
          });
        }, 3000);
      }
    });
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    const joinedDate = moment(this.props.userInfo.joinedDate).format('Do MMM YYYY');
    return (
      <div id="personal-info-comp">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <form
                id="personal-info-form"
                className="form center-block"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <h3>
                    <span className="immutable-info-title">Member No:</span> {this.props.userInfo.clcNo}
                  </h3>
                </div>
                <div className="form-group">
                  <h3>
                    <span className="immutable-info-title">Username:</span> {this.props.userInfo.username}
                  </h3>
                </div>
                <div className="form-group">
                  <h3>
                    <span className="immutable-info-title">Joined Date:</span> {joinedDate}
                  </h3>
                </div>
                <div className="form-group">
                  <h3>
                    <span className="immutable-info-title">Introducer:</span> {this.state.introducerInfoStr}
                  </h3>
                </div>
                <hr />
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
                <div className="form-group">
                  <input
                    type="text"
                    id="personal-info-firstname"
                    className="form-control input-lg"
                    placeholder="member name"
                    onChange={this.onChangeInput}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="personal-info-surname"
                    className="form-control input-lg"
                    placeholder="member surname"
                    onChange={this.onChangeInput}
                    value={this.state.lastName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="personal-info-cellno"
                    className="form-control input-lg"
                    placeholder="cell no"
                    onChange={this.onChangeInput}
                    value={this.state.cellNo}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    id="personal-info-button"
                    className="btn btn-lg btn-primary btn-block"
                    value="SAVE PERSONAL INFO"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
