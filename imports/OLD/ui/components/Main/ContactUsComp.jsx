import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
import './ContactUsComp.less';

export default class ContactUsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      category: 'General',
      message: '',
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

  }
  handleCategoryChange(e) {
    this.setState({
      category: e.target.value,
    });
  }

  handleMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    Meteor.call(
      'contact_us_messages.create',
      this.state.category,
      this.state.message,
      (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Message Saved and Sent! Admin will respond within 24hrs.',
            feedbackMessageType: 'success',
            category: 'General',
            message: '',
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
    const categoriesArr = ['General', 'Technical Issue', 'Token Issue', 'Feedback/Suggestions'];

    return (
      <div id="contact-us-comp">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8 contact-us-area">
              <div className="col-md-12">
                <h1 className="text-center">Contact Us</h1>
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
                <div className="section-row form-group row justify-content-md-center">
                  <div className="col-md-12 row1 text-center">Please select a category?</div>
                  <select
                    name="form-field-name"
                    id="contact-us-category"
                    className="form-control input-lg col-md-8 select-dropdown-fields row2"
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                  >
                    {categoriesArr.map(val => <option value={val}>{val}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    rows="7"
                    type="text"
                    id="contact-us-message"
                    className="form-control input-lg row3"
                    placeholder="Please write your message here."
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                  />
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
