import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AuthFeedbackMessageComp from './AuthFeedbackMessageComp';
import './IntroducerSearchComp.less';

export default class IntroducerSearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      searchResults: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeIntroducer = this.onChangeIntroducer.bind(this);
  }

  onChangeSearch() {
    const searchValue = document.getElementById('search-input').value;
    Meteor.call('introducerSearchDB', searchValue, (err, result) => {
      if (err) {
        console.log('err:', err);
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('result:', result);
        this.setState({
          feedbackMessage: '',
          searchResults: result,
        });
      }
    });
  }

  onChangeIntroducer(selectedIntroducer) {
    console.log('selectedIntroducer', selectedIntroducer);
    this.setState({
      feedbackMessage: '',
      selectedIntroducer,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    this.props.saveIntroducerInfoState(this.state.selectedIntroducer)
    this.props.history.push('/auth/signup');
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="introducer-search">
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="text-center">Introducer Search</h1>
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
                  <div className="form-group">
                    <input
                      type="text"
                      id="search-input"
                      className="form-control input-lg"
                      placeholder="search"
                      onChange={this.onChangeSearch}
                    />
                  </div>
                  <div className="main-results-screen">
                    <ul>
                      {this.state.searchResults.map((result, i, a) => {
                        const resultStr = `${i + 1})
                                    ${result.firstName}
                                    ${result.lastName}
                                    (${result.clcNo})
                                    `
                        return (
                          <li key={result._id} className="row result-list-entry">
                            <Button onClick={() => this.onChangeIntroducer(result)}>
                              {resultStr}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      id="login-button"
                      className="btn btn-lg btn-primary btn-block"
                      value="Select"
                    />
                  </div>
                  <div className="form-group">
                    <p className="text-center">
                      {/* <Link to="/auth/login">Login</Link> */}
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
