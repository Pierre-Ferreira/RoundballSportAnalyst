import React, { Component } from 'react';

export default class WelcomeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.close = this.close.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.showIntroducerSearchModal = this.showIntroducerSearchModal.bind(this);
    // this.onChangeInput = this.onChangeInput.bind(this);
  }
  componentWillMount() {
    // Get user information from DB.
    Meteor.call('getUserInfoDB', (err, result) => {
      if (err) {
        console.log('getUserInfoDB ERR:', err)
      } else {
        // Load user information to REDUX store.
        console.log('getUserInfoDB :', result)
        console.log('PROPS:', this.props)
        const userInfo = result[0];
        this.props.saveUserInfoState(userInfo);
      }
    })
  }
  render() {
    return (
      <h1 className="text-center">
        Welcome {this.props.userInfo.firstName} {this.props.userInfo.lastName} ({this.props.userInfo.clcNo})
      </h1>
    );
  }
};

// WelcomeComp.propTypes = {
//
// };
//
// export default WelcomeComp;
