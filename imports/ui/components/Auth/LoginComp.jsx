import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthFeedbackMessageComp from './AuthFeedbackMessageComp';
import './LoginComp.less';

export default class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      resendVerificationMessages: '',
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resendVerificationEmail = this.resendVerificationEmail.bind(this);
  }

  close() {
    this.props.history.push('/');
  }

  resendVerificationEmail() {
    // Clear the states.
    this.setState({
      feedbackMessage: 'Busy...',
      resendVerificationMessages: '',
      feedbackMessageType: 'success',
    });
    // Retrieve the email.
    const email = document.getElementById('login-email').value;
    // Call the method to resend the verification email.
    Meteor.call('resendVerificationEmail', email, (err) => {
      if (err) {
        this.setState({
          feedbackMessage: `${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        this.setState({
          feedbackMessage: 'Verification email has been resent! Please check your email.',
          feedbackMessageType: 'success',
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          feedbackMessage: `${err.reason}`,
          feedbackMessageType: 'danger',
        });
        if (err.error === 'email-not-verified') {
          this.setState({
            resendVerificationMessages: 'Resend verification email?',
            feedbackMessageType: 'warning',
          });
        } else {
          this.setState({
            resendVerificationMessages: '',
          });
        }
      } else {
        this.props.history.push('/main/welcome');
      }
    });
  }

  render() {
    const { feedbackMessage, feedbackMessageType, resendVerificationMessages } = this.state;
    return (
      <div id="login-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" size="lg" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <h1 className="text-center">Login</h1>
              </div>
              <div className="modal-body">
                <AuthFeedbackMessageComp
                  feedbackMessageType={feedbackMessageType}
                  feedbackMessage={feedbackMessage}
                  resendVerificationEmailFN={this.resendVerificationEmail}
                  resendVerificationMessages={resendVerificationMessages}
                />
                <form
                  id="login-form"
                  className="form col-md-12 center-block"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      id="login-email"
                      className="form-control input-lg"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      id="login-password"
                      className="form-control input-lg"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group text-center">
                    <p className="text-left">
                      <Link to="/auth/forgot_password">Forgot Password?</Link>
                    </p>
                  </div>
                  <div className="form-group text-center">
                    <input
                      type="submit"
                      id="login-button"
                      className="btn btn-primary btn-lg btn-block"
                      value="Login"
                    />
                  </div>
                  <div className="form-group text-center">
                    <p className="text-center">
                      Don't have an account? Register <Link to="/auth/signup">here</Link>
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
