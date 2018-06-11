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
      trnxNo: '',
    };
    this.handleNoOfTokensChange = this.handleNoOfTokensChange.bind(this);
    this.handleTrnxNoChange = this.handleTrnxNoChange.bind(this);
  }
  componentWillMount() {

  }

  handleNoOfTokensChange(e) {
    this.setState({
      noOfTokens: e.target.value,
    });
  }
  handleTrnxNoChange(e) {
    // const email = document.getElementById('email-info').value;
    // this.setState({ email });
    this.setState({
      trnxNo: e.target.value,
    });
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
                  <div className="section-row form-group row justify-content-md-center">
                    <div className="col-md-8 game-row1 text-center">How many tokens do you want to get?</div>
                    <select
                      name="form-field-name"
                      id="game-visitor-team-tries"
                      className="form-control input-lg col-md-2 select-dropdown-fields game-row1"
                      value={this.state.noOfTokens}
                      onChange={this.handleNoOfTokensChange}
                    >
                      {noValuesArr.map(val => <option value={val}>{val}</option>)}
                    </select>
                  </div>
                  <p className="get-tokens-scroll-area">
                    <h2>Token purchase process:</h2>
                    <ol className="custom-counter">
                      <li>Click
                        <a
                          href="https://coingate.com/pay/oddball_sport_analyst"
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
                      <li>Once confirmed copy the very long Transaction Number
                        (in blue in BITCOIN TRANSACTIONS section) and paste it
                        in the "TRX NO" field below.
                        Fill in rest of the needed details on that form and submit it.
                      </li>
                      <li>Please take screenshot of this 'Paid and Confirmed'
                        screen for future reference.
                      </li>
                      <li>OSA admin will release your Tokens within 24 hours
                        from confirmed transaction.
                      </li>
                    </ol>
                  </p>
                  <div className="form-group">
                    <input
                      type="test"
                      id="trnx-no"
                      className="form-control input-lg"
                      placeholder="TRNX NO"
                      onChange={this.handleTrnxNoChange}
                      value={this.state.trnxNo}
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
