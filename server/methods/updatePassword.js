import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updatePassword(passwordObj) {
    console.log('passwordObj:', passwordObj)
    check(passwordObj, {
      digest: String,
      algorithm: String,
    });
    // if (password.length === 0) throw new Meteor.Error(403, 'Password is required');
    const { userId } = this;
    Accounts.setPassword(userId, passwordObj, { logout: false });
  },
});
