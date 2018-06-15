import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import './TokenPurchaseComp.less';

export default class TokenPurchaseComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      noOfTokens: 0,
      TXID: '',
    };
    this.handleNoOfTokensChange = this.handleNoOfTokensChange.bind(this);
    this.handleTrnxNoChange = this.handleTrnxNoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

  }

  handleNoOfTokensChange(e) {
    this.setState({
      noOfTokens: e.target.value,
    });
  }

  handleTrnxNoChange(e) {
    this.setState({
      TXID: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    Meteor.call(
      'token_purchase.create',
      Number(this.state.noOfTokens),
      this.state.TXID + '',
      (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Token Purchase Info Saved! Tokens will be released within 24hrs.',
            feedbackMessageType: 'success',
            noOfTokens: 0,
            TXID: '',
          });
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      },
    );
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    const noValuesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div id="get-tokens-comp">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8 get-tokens-area">
              <div className="col-md-6 offset-md-3 heading-area">
                <h1 className="text-center">Get Tokens</h1>
              </div>
              <div className="col-md-12 center-block alert-area">
                {(feedbackMessage) ?
                  <Alert bsStyle={feedbackMessageType}>
                    {feedbackMessage}
                  </Alert>
                : null }
              </div>
              <form
                id="get-tokens-form"
                className="form col-md-12 center-block"
                onSubmit={this.handleSubmit}
              >
                <div className=" container">
                  <p className="get-tokens-scroll-area">
                    <h2>Token purchase process:</h2>
                    <ol className="custom-counter">
                      <li>Click
                        <a
                          href="https://coingate.com/pay/roundball_sport_analyst"
                          target="_blank"
                          rel="noopener noreferrer"
                        > <span> here </span>
                        </a>
                        to open screen that starts the payment process.
                      </li>
                      <li>Enter your details on the that screen.</li>
                      <li>Specify on the slider how many tokens you would like
                        to purchase (1 token = R100).
                      </li>
                      <li>Hit checkout.</li>
                      <li>On next page select Bitcoin as payment currency.
                        <b>And enter your email address.</b>
                      </li>
                      <li>Hit 'Pay with Bitcoin' button.</li>
                      <li>You now have 20 mins to do the payment.</li>
                      <li>If you take longer that 20 mins or pay less than
                        specified on the screen your transaction will not confirm.
                        Keep an eye on 'AMOUNT LEFT TO PAY:' bottom right of screen.
                      </li>
                      <li>Once done it will take a few minutes to
                        confirm ('Paid and Confirmed' in green).
                      </li>
                      <li>Once confirmed copy the VERY long Transaction Number
                        (in blue in BITCOIN TRANSACTIONS section) and paste it
                        in the "TXID" field below. Please set the number of tokens
                        you purchased and hit SUBMIT below.
                      </li>
                      <li>Please take screenshot of this 'Paid and Confirmed'
                        screen for future reference.
                      </li>
                      <li>RBSA admin will release your Tokens within 24 hours
                        from confirmed transaction.
                      </li>
                    </ol>
                  </p>
                  <div className="section-row form-group row justify-content-md-center">
                    <div className="col-md-12 row1 text-center">How many tokens did you purchase?</div>
                    <select
                      name="form-field-name"
                      id="get-no-of-tokens"
                      className="form-control input-lg col-md-2 select-dropdown-fields row2"
                      value={this.state.noOfTokens}
                      onChange={this.handleNoOfTokensChange}
                    >
                      {noValuesArr.map(val => <option value={val}>{val}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="trnx-no"
                      className="form-control input-lg row3"
                      placeholder="Paste TXID here."
                      onChange={this.handleTrnxNoChange}
                      value={this.state.TXID}
                    />
                  </div>
                </div>
                <div className="form-group btn-area text-center col-md-12">
                  <Button
                    className="save-btn"
                    bsStyle="primary"
                    bsSize="large"
                    block
                    onClick={this.handleSubmit}
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
