import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import './PasswordResetComp.less';

export default class PasswordResetComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput() {
    const password = document.getElementById('password').value;
    this.setState({ password });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    let { password } = this.state;
    password = password.trim();
    if (password.length === 0) {
      this.setState({
        feedbackMessage: 'ERROR: Password is required',
        feedbackMessageType: 'danger',
      });
    } else {
      Meteor.call('updatePassword', Accounts._hashPassword(password), (err, result) => {
        if (err) {
          console.log('updatePassword ERR:', err);
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          console.log('updatePassword:', result);
          this.setState({
            feedbackMessage: 'Password was reset!',
            feedbackMessageType: 'success',
            password: '',
          });
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

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="password-reset-comp">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {(feedbackMessage) ?
                <Alert bsStyle={feedbackMessageType}>
                  {feedbackMessage}
                </Alert>
              : null }
              <form
                id="email-info-form"
                className="form center-block"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    id="password"
                    className="form-control input-lg"
                    placeholder="new password"
                    onChange={this.onChangeInput}
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    id="password-reset-button"
                    className="btn btn-lg btn-primary btn-block"
                    value="RESET PASSWORD"
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
