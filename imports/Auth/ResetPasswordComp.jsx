import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Button } from 'react-bootstrap';
import AuthFeedbackMessageComp from './AuthFeedbackMessageComp';
import './ResetPasswordComp.less';

export default class ResetPasswordComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      tokenExpiredFlag: false,
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.props.history.push('/');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      tokenExpiredFlag: false,
    });
    const password = document.getElementById('signup-password').value;
    const retypePassword = document.getElementById('retype-signup-password').value;
    // Check if a password was set.
    if (password.trim().length === 0) {
      this.setState({
        feedbackMessage: 'Please enter password!',
      });
    // Check if the passwords match.
    } else if (password !== retypePassword) {
      this.setState({
        feedbackMessage: 'Passwords do not match!',
      });
    } else {
      const { token } = this.props.match.params;
      if (password.trim().length === 0) {
        this.setState({
          feedbackMessage: 'Token for password reset not available!',
        });
      } else {
        Accounts.resetPassword(token, retypePassword, (err) => {
          if (err) {
            if (err.reason === 'Token expired') {
              this.setState({
                feedbackMessage: `${err.reason}!`,
                tokenExpiredFlag: true,
                feedbackMessageType: 'danger',
              });
            } else {
              this.setState({
                feedbackMessage: err.reason,
                feedbackMessageType: 'danger',
              });
            }
          } else {
            this.setState({
              feedbackMessage: 'Password has been reset. Please login.',
              feedbackMessageType: 'success',
            });
          }
        });
      }
    }
  }

  render() {
    const { feedbackMessageType, feedbackMessage, tokenExpiredFlag } = this.state;
    return (
      <div id="reset-password-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" size="lg" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <h1 className="text-center">Reset Password</h1>
              </div>
              <div className="modal-body">
                <AuthFeedbackMessageComp
                  feedbackMessageType={feedbackMessageType}
                  feedbackMessage={feedbackMessage}
                  tokenExpiredFlag={tokenExpiredFlag}
                />
                <form
                  id="login-form"
                  className="form col-md-12 center-block"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="password"
                      id="signup-password"
                      className="form-control input-lg"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      id="retype-signup-password"
                      className="form-control input-lg"
                      placeholder="re-type password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      id="login-button"
                      className="btn btn-lg btn-primary btn-block"
                      value="Reset password"
                    />
                  </div>
                  <div className="form-group">
                    <p className="text-center">
                      <Link to="/auth/login">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
              <div className="modal-footer" style={{ borderTop: 0 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
