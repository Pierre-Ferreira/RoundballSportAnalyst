import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  resendVerificationEmail(email) {
    check(email, String);
    let userId = '';
    const user = Accounts.findUserByEmail(email);
    if (user && user._id) {
      userId = user._id;
      return Accounts.sendVerificationEmail(userId);
    } else {
      throw new Meteor.Error('user-not-found', `User could not be found for ${email}!`);
    }
  },
});
