import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import './WalletInfoComp.less';

export default class WalletInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      walletAddress: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentWillMount() {
    this.setState({
      walletAddress: this.props.userInfo.walletAddress,
    });
  }

  onChangeInput() {
    const walletAddress = document.getElementById('wallet-address').value;
    this.setState({ walletAddress });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    let { walletAddress } = this.state;
    walletAddress = walletAddress.trim();
    const walletInfo = {
      walletAddress,
    };
    Meteor.call('updateWalletInfo', walletInfo, (err, result) => {
      if (err) {
        console.log('updateWalletInfo ERR:', err);
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('updateWalletInfo:', result);
        this.setState({
          feedbackMessage: 'Wallet Address Saved!',
          feedbackMessageType: 'success',
        });
        this.props.saveWalletInfoState(walletInfo)
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
      <div id="wallet-info-comp">
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
                    id="wallet-address"
                    className="form-control input-lg"
                    placeholder="wallet address"
                    onChange={this.onChangeInput}
                    value={this.state.walletAddress}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    id="wallet-info-button"
                    className="btn btn-lg btn-primary btn-block"
                    value="SAVE WALLET ADDRESS"
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
