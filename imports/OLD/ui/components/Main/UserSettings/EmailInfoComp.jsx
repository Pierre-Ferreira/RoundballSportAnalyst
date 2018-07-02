import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import './EmailInfoComp.less';

export default class EmailInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentWillMount() {
    this.setState({
      email: this.props.userInfo.email,
    });
  }

  onChangeInput() {
    const email = document.getElementById('email-info').value;
    this.setState({ email });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    let { email } = this.state;
    email = email.trim();
    const emailInfo = {
      emailNew: email,
      emailOld: this.props.userInfo.email,
    };
    Meteor.call('updateEmailInfo', emailInfo, (err, result) => {
      if (err) {
        console.log('updateEmailInfo ERR:', err);
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('updateEmailInfo:', result);
        this.setState({
          feedbackMessage: 'Email Address Saved!',
          feedbackMessageType: 'success',
        });
        this.props.saveEmailInfoState(emailInfo)
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
    return (
      <div id="email-info-comp">
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
                    type="email"
                    id="email-info"
                    className="form-control input-lg"
                    placeholder="member email"
                    onChange={this.onChangeInput}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    id="email-info-button"
                    className="btn btn-lg btn-primary btn-block"
                    value="SAVE EMAIL ADDRESS"
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
