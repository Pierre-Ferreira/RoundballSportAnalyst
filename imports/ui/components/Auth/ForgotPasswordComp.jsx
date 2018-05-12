import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Button } from 'react-bootstrap';
import AuthFeedbackMessageComp from './AuthFeedbackMessageComp';
import './ForgotPasswordComp.less';

export default class ForgotPasswordComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.props.history.push('/');
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        this.setState({
          feedbackMessage: 'Email sent! Please click the reset-password link.',
          feedbackMessageType: 'success',
        });
      }
    });
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="forgot-password-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" size="lg" onClick={this.close}>X</Button>
              </div>
              <div className="modal-header">
                <h1 className="text-center">Forgot Password</h1>
              </div>
              <div className="modal-body">
                <AuthFeedbackMessageComp
                  feedbackMessageType={feedbackMessageType}
                  feedbackMessage={feedbackMessage}
                />
                <form
                  id="login-form"
                  className="form col-md-12 center-block"
                  onSubmit={this.handleSubmit}
                >
                  {/* <div className="form-group">
                    <input type="text" id="signup-name"
                          className="form-control input-lg" placeholder="name"/>
                  </div> */}
                  <div className="form-group">
                    <input
                      type="email"
                      id="signup-email"
                      className="form-control input-lg"
                      placeholder="email"
                    />
                  </div>
                  {/* <div className="form-group">
                    <input type="password" id="signup-password"
                          className="form-control input-lg"
                          placeholder="password"/>
                  </div> */}
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
