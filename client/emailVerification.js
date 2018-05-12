import { Accounts } from 'meteor/accounts-base';
import { push } from 'react-router-redux';

// If the user clicks the link on the verification email, then set verify email field in user.
Accounts.onEmailVerificationLink((token, done) => {
  Accounts.verifyEmail(token, (error) => {
    if (error) {
      console.log('verifyEmail ERROR:', error)
    } else {
      console.log('verifyEmail SUCCESS.', this);
      Meteor.logout()
    }
  });
});
