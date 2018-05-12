import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import AuthFeedbackMessageComp from './AuthFeedbackMessageComp';
import './SignupComp.less';

export default class SignupComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showIntroducerSearchModal = this.showIntroducerSearchModal.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput() {
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-surname').value;
    const cellNo = document.getElementById('signup-cellno').value;
    const walletAddress = document.getElementById('signup-wallet-address').value;
    const signupInfo = {
      email,
      username,
      firstName,
      lastName,
      cellNo,
      walletAddress,
    };
    this.props.saveSignupInfoState(signupInfo);
  }

  showIntroducerSearchModal() {
    this.props.history.push('/auth/signup/introducer_search');
  }

  close() {
    this.props.history.push('/');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    const userInfo = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      cellNo: this.props.cellNo,
      introducersUserId: this.props.introducerId || '',
      walletAddress: this.props.walletAddress,
      active: true,
      joinedDate: new Date(),
    };
    Accounts.createUser({
      email: this.props.email,
      password: document.getElementById('signup-password').value,
      username: document.getElementById('signup-username').value,
      userInfo,
    }, (err) => {
      if (err) {
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        Meteor.call('sendVerificationLink', (error) => {
          if (error) {
            this.setState({
              feedbackMessage: error.reason,
              feedbackMessageType: 'danger',
            });
          } else {
            this.setState({
              feedbackMessage: 'Email sent! Please click the verification link!',
              feedbackMessageType: 'success',
            });
          }
        });
      }
    });
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="signup-comp">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-button-area">
                <Button color="danger" className="pull-right close-button" size="lg" onClick={this.close}>X</Button>
              </div>
              <div className="container">
                <div className="row">
                  <div className="modal-header col-xs-12">
                    <h1 className="text-center">Sign up</h1>
                    <div>All fields are required*</div>
                  </div>
                  <div className="modal-body col-xs-12">
                    <AuthFeedbackMessageComp
                      feedbackMessageType={feedbackMessageType}
                      feedbackMessage={feedbackMessage}
                    />
                    <form
                      id="login-form"
                      className="form center-block"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          id="signup-firstname"
                          className="form-control input-lg"
                          placeholder="member name"
                          onChange={this.onChangeInput}
                          value={this.props.firstName}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          id="signup-surname"
                          className="form-control input-lg"
                          placeholder="member surname"
                          onChange={this.onChangeInput}
                          value={this.props.lastName}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          id="signup-username"
                          className="form-control input-lg"
                          placeholder="username"
                          onChange={this.onChangeInput}
                          value={this.props.username}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          id="signup-email"
                          className="form-control input-lg"
                          placeholder="email"
                          onChange={this.onChangeInput}
                          value={this.props.email}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          id="signup-cellno"
                          className="form-control input-lg"
                          placeholder="cell no"
                          onChange={this.onChangeInput}
                          value={this.props.cellNo}
                        />
                      </div>
                      <div className="form-group introducer-group">
                        <input
                          type="text"
                          id="signup-introducers-userid"
                          className="form-control input-lg"
                          placeholder="introducer"
                          value={this.props.introducerInfoStr}
                          readOnly
                        />
                        <input
                          type="input"
                          id="search-button"
                          onClick={this.showIntroducerSearchModal}
                          className="btn btn-lg btn-info btn-block"
                          value="SEARCH"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          id="signup-wallet-address"
                          className="form-control input-lg"
                          placeholder="bitcoin wallet address"
                          onChange={this.onChangeInput}
                          value={this.props.walletAddress}
                        />
                      </div>
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
                          type="submit"
                          id="login-button"
                          className="btn btn-lg btn-primary btn-block"
                          value="Sign Up"
                        />
                      </div>
                      <div className="form-group">
                        <p className="text-center">
                          Already have an account? Login <Link to="/auth/login">here</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer" style={{ borderTop: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
