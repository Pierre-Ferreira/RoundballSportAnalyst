import React, { Component } from 'react';
import ActiveGamesLayoutContainer from '../../containers/Main/ActiveGamesLayoutContainer'

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
      <div>
        <a target="_blank" rel="nofollow" href="https://coingate.com/pay/oddball_sport_analyst"><img alt="CoinGate Payment Button" src="https://static.coingate.com/images/buttons/1.png" /></a>
        <h1 className="text-center">
          <ActiveGamesLayoutContainer {...this.props} />
        </h1>
      </div>
    );
  }
};

// WelcomeComp.propTypes = {
//
// };
//
// export default WelcomeComp;
