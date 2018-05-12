import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import moment from 'moment-timezone';
import { Button } from 'react-bootstrap';
import CsvParse from '@vtex/react-csv-parse';
import settings from '../../../../settings.json';
import './blockchainAPIPaymentsComp.less';

export default class BlockchainAPIPaymentsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      accounts: '',
      balance: 0,
      arrayClients: [],
      paymentData: '',
      allowPaymentsRun: false,
    };
    this.checkBalance = this.checkBalance.bind(this);
    this.checkAccounts = this.checkAccounts.bind(this);
    // this.payManyAPI = this.payManyAPI.bind(this);
    this.payManyOneByOne = this.payManyOneByOne.bind(this);
    this.payOne = this.payOne.bind(this);
    this.uploadDataToState = this.uploadDataToState.bind(this);
    this.stopRunningPayments = this.stopRunningPayments.bind(this);
  }

  mockPaymentFunc(clientDetails) {
    const randomSwap = Math.floor(Math.random() * 2);
    if (randomSwap) {
      const response = {};
      response.data = {
        "to": [clientDetails['BTC Wallet Address']],
        "amounts" : [clientDetails['SATOSHI Amount']],
        "from" : [
          "xpub6BqAYfNcnJcRTs7p3ejpccoi9xFqeSpJ6fLpBJTNv6vjNTpbZf2ENo6D9BXwSQ4oMrYfZLDyNezz6soddngn2ReqGeursu58deC8W9ahUsL"
        ],
        "fee" : 4520,
        "txid" : "5f80859dd979cf47bf8d4fbac13baebf2b1ae43fe209f9d1a620da46111d4ab4",
        "tx_hash" : "5f80859dd979cf47bf8d4fbac13baebf2b1ae43fe209f9d1a620da46111d4ab4",
        "message" : "Payment Sent",
        "success" : true,
        "warning" : "Setting a fee_per_byte value below 50 satoshi/byte is not recommended, and may lead to long confirmation times"
      };
      console.log('PAY ONE:', response);
      clientDetails['TXSuccessfull'] = true;
      clientDetails['TXDATA'] = response.data;
      clientDetails['TXCompleted'] = new Date();
      this.setState({
        payOneInfo: response.data,
        feedbackMessage: '',
        arrayClients: [...this.state.arrayClients, clientDetails],
      });
      const methodName = 'month_end_payment.create';
      Meteor.call(methodName, clientDetails, (err, res) => {
        if (err) {
          console.log('err:',err);
        } else {
          console.log('res9:',res);
        }
      });
    } else {
      const error = {
        "config" : {
            "transformRequest" : {},
            "transformResponse" : {},
            "timeout" : 0,
            "xsrfCookieName" : "XSRF-TOKEN",
            "xsrfHeaderName" : "X-XSRF-TOKEN",
            "maxContentLength" : -1,
            "headers" : {
                "Accept" : "application/json, text/plain, */*"
            },
            "method" : "get",
            "params" : {
                "to" : "3QUkLBU595AHJgn62joKMT3xwNJo2mSRST",
                "from" : 0,
                "amount" : 5000,
                "password" : "P7e7e7r7f7e7",
                "fee_per_byte" : "20"
            },
            "url" : "http://localhost:3000/merchant/33b87510-fcb8-415b-b92c-d668e92ea390/payment"
        },
        "request" : {},
        "response" : {
            "data" : {
                "error" : "Error signing and pushing transaction"
            },
            "status" : 500,
            "statusText" : "Internal Server Error",
            "headers" : {
                "content-type" : "application/json; charset=utf-8"
            },
            "config" : {
                "transformRequest" : {},
                "transformResponse" : {},
                "timeout" : 0,
                "xsrfCookieName" : "XSRF-TOKEN",
                "xsrfHeaderName" : "X-XSRF-TOKEN",
                "maxContentLength" : -1,
                "headers" : {
                    "Accept" : "application/json, text/plain, */*"
                },
                "method" : "get",
                "params" : {
                    "to" : "3QUkLBU595AHJgn62joKMT3xwNJo2mSRST",
                    "from" : 0,
                    "amount" : 5000,
                    "password" : "P7e7e7r7f7e7",
                    "fee_per_byte" : "20"
                },
                "url" : "http://localhost:3000/merchant/33b87510-fcb8-415b-b92c-d668e92ea390/payment"
            },
            "request" : {}
        }
      };
      console.log('PAY ONE ERR:', error);
      clientDetails['TXSuccessfull'] = false;
      clientDetails['TXDATA'] = error;
      clientDetails['TXCompleted'] = new Date();
      this.setState({
        feedbackMessage: error.error,
        arrayClients: [...this.state.arrayClients, clientDetails],
      });
      const methodName = 'month_end_payment.create';
      Meteor.call(methodName, clientDetails, (err, res) => {
        if (err) {
          console.log('err:',err);
        } else {
          console.log('res10:',res);
        }
      });
    }
  }

  payOne(clientDetails) {
    console.log("clientDetails:", clientDetails);
    axios.get(`http://localhost:3000/merchant/${settings.blockchain.guid}/payment`, {
      params: {
        to: clientDetails['BTC Wallet Address'],
        from: 0,
        amount: clientDetails['Satoshi To Pay'],
        password: settings.blockchain.password,
        second_password: settings.blockchain.second_password,
        fee_per_byte: '150',
      },
    })
      .then((response) => {
        console.log('PAY ONE:', response);
        clientDetails['TXSuccessfull'] = true;
        console.log('STEP1');
        clientDetails['TXDATA'] = response.data;
        console.log('STEP2');
        clientDetails['TXCompleted'] = new Date();
        console.log('STEP3');
        // this.setState({
        //   payOneInfo: response.data,
        //   feedbackMessage: '',
        //   arrayClients: [...this.state.arrayClients, clientDetails],
        // });
        console.log('WRITING SUCCESS TO DB!')
        const methodName = 'month_end_payment.create';
        Meteor.call(methodName, clientDetails, (err, res) => {
          if (err) {
            console.log('err:',err);
          } else {
            console.log('res9:',res);
          }
        });
      })
      .catch((error) => {
        console.log('PAY ONE ERR:', error);
        clientDetails['TXSuccessfull'] = false;
        console.log('STEP1');
        clientDetails['TXDATA'] = error;
        console.log('STEP2');
        clientDetails['TXCompleted'] = new Date();
        console.log('STEP3');
        // this.setState({
        //   feedbackMessage: error.error,
        //   arrayClients: [...this.state.arrayClients, clientDetails],
        // });
        console.log('WRITING FAIL TO DB!')
        const methodName = 'month_end_payment.create';
        Meteor.call(methodName, clientDetails, (err, res) => {
          if (err) {
            console.log('err:',err);
          } else {
            console.log('res10:',res);
          }
        });
      });
  }

  uploadDataToState(data) {
    this.setState({
      paymentData: data,
    });
  }

  stopRunningPayments() {
    this.setState({
      allowPaymentsRun: false,
    });
  }

  payManyOneByOne() {
    if (this.state.paymentData) {
      this.setState({
        allowPaymentsRun: true,
        balance: 0,
      });
      const data = this.state.paymentData;
      const that = this;
      const delay = (amount) => {
        return new Promise((resolve) => {
          setTimeout(resolve, amount);
        });
      };
      console.log('data:', data);
      async function loop() {
        for (let i = 0; i < data.length; i++) {
          const client = data[i];
          console.log(client["BTC Wallet Address"]);
          console.log(client["Cell number"]);
          console.log(client["Email Address"]);
          console.log(client["First Name"]);
          console.log(client["Last Name"]);
          console.log('Next Payment call in 10 seconds..');
          await delay(1000);
          console.log('9.')
          await delay(1000);
          console.log('8.')
          await delay(1000);
          console.log('7.')
          await delay(1000);
          console.log('6.')
          await delay(1000);
          console.log('5.')
          await delay(1000);
          console.log('4.')
          await delay(1000);
          console.log('3.')
          await delay(1000);
          console.log('2.')
          await delay(1000);
          console.log('1.')
          await delay(1000);
          console.log('Firing call now!')
          if (that.state.allowPaymentsRun) {
            // that.mockPaymentFunc(client);
            that.payOne(client);
          } else {
            console.log('PAYMENTS RUN STOPPED!')
            break;
          }
        }
      }
      loop();
    }
  }

  // payManyAPI(clientsObj) {
  //   const myJSONString = JSON.stringify(clientsObj);
  //   console.log('myJSONString:', myJSONString);
  //   const myURIEncodedJSONString = encodeURIComponent(myJSONString);
  //   console.log('myURIEncodedJSONString:', myURIEncodedJSONString);
  //   axios.get(`http://localhost:3000/merchant/${settings.blockchain.guid}/sendmany`, {
  //     params: {
  //       recipients: clientsObj,
  //       from: settings.blockchain.wallet_address,
  //       password: settings.blockchain.password,
  //       fee_per_byte: '50',
  //     },
  //   })
  //     .then((response) => {
  //       console.log('PAYMENTS:', response);
  //       // this.setState({
  //       //   paymentInfo: response.data,
  //       //   feedbackMessage: '',
  //       // });
  //     })
  //     .catch((error) => {
  //       console.log('PAYMENTS ERR:', error);
  //       // this.setState({
  //       //   feedbackMessage: error,
  //       // });
  //     });
  // }

  checkAccounts() {
    axios.get(`http://localhost:3000/merchant/${settings.blockchain.guid}/accounts`, {
      params: {
        password: settings.blockchain.password,
      },
    })
      .then((response) => {
        console.log('ACCOUNTS3:', response);
        this.setState({
          accounts: response.data[0].label,
          feedbackMessage: '',
        });
      })
      .catch((error) => {
        console.log('ACCOUNTS ERR:', error);
        this.setState({
          feedbackMessage: error,
        });
      });
  }

  checkBalance() {
    axios.request({
      url: `http://localhost:3000/merchant/${settings.blockchain.guid}/balance`,
      method: 'get',
      params: {
        password: settings.blockchain.password,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('BALANCE:', response);
        this.setState({
          balance: response.data.balance,
          feedbackMessage: '',
        });
      })
      .catch((error) => {
        console.log('BALANCE ERR:', error);
        this.setState({
          feedbackMessage: error,
        });
      });
  }

  setUserRoles() {
    const methodName = 'setUserRoles';
    Meteor.call(methodName, (err, res) => {
      if (err) {
        console.log('ROLES UPDATE FAIL:', err);
      } else {
        console.log('ROLES UPDATED!:', res);
      }
    });
  }

  render() {
    const keys = [
      'Amount',
      'BTC to Pay',
      'BTC To Pay (Not rounded)',
      'BTC Wallet Address',
      'Cell number',
      'Dollar To Pay',
      'Dollar To Pay (Before TX Fees)',
      'Dollar/BTC',
      'Email Address',
      'First Name',
      'Last Name',
      'Satoshi To Pay',
      'TX Fees',
      'TX Fees BTC',
      'TX Fees Satoshi',
      'none',
    ];
    return (
      <div className="blockchain-api-payments">
        {this.state.feedbackMessage ?
          <div>
            <h1>FEEDBACK:</h1>
            <div>{this.state.feedbackMessage}</div>
          </div>
        : ''}
        <div>
          <Button bsStyle="primary" onClick={this.setUserRoles}>
              Update Roles
          </Button>
        </div>
        <Button bsStyle="primary" onClick={this.checkAccounts}>
            Account Name
        </Button>
        <div>INFO: {this.state.accounts}</div>
        <Button bsStyle="primary" onClick={this.checkBalance}>
            Account Balance
        </Button>
        <div>BALANCE: {this.state.balance} Satoshis</div>
        <h1 className="text-center">Payments</h1>
        <CsvParse
          keys={keys}
          separators={[',']}
          onDataUploaded={this.uploadDataToState}
          render={onChange => <input type="file" onChange={onChange} />}
        />
        {this.state.allowPaymentsRun ?
          <div>Payments Running!</div> :
          <div>Payments NOT Running!</div>
        }
        <Button
          bsStyle="success"
          onClick={this.payManyOneByOne}
          disabled={this.state.allowPaymentsRun || this.state.balance === 0}
        >
          Run Payments
        </Button>
        <Button bsStyle="danger" onClick={this.stopRunningPayments}>
          STOP
        </Button>
        <div className="main-results-screen">
          <ul>
            {this.props.MonthEndPayments.map((payment, i, a) => {
              const contactInfo = payment['Email Address'] ? payment['Email Address'] : payment['Cell number'];
              const walletAddress = payment['BTC Wallet Address'];
              const btcAmount = Math.round((Number(payment['BTC to Pay']) + 0.0000113) * 10000000) / 10000000;
              const paymentDate = moment.tz(payment['TXCompleted'], 'Africa/Johannesburg').format('DD-MM-YY HH:mm:ss');
              const paymentStr = `${a.length - i}.
                                  (${payment['_id']})
                                  ${payment['First Name']}
                                  ${payment['Last Name']}
                                  ${walletAddress}
                                  (${btcAmount}BTC)
                                  ${paymentDate}
                                  `
              return (
                <li key={payment._id} className="row payment-list-entry">
                  <div className={payment['TXSuccessfull'] ? 'payment-successful' : 'payment-fail'}>
                    {paymentStr}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
