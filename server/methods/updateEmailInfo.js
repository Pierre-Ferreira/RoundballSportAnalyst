import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updateEmailInfo(emailInfo) {
    check(emailInfo, {
      emailNew: String,
      emailOld: String,
    });
    if (emailInfo.emailNew.length === 0) throw new Meteor.Error(403, 'Member Email is required');
    const { userId } = this;
    // First remove the old user email.
    Accounts.removeEmail(userId, emailInfo.emailOld);
    Accounts.addEmail(userId, emailInfo.emailNew);
  },
});
