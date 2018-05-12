import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  setUserRoles() {
    const email = 'pierre@tektite.biz'
    let userId = '';
    const user = Accounts.findUserByEmail(email);
    if (user && user._id) {
      userId = user._id;
      Roles.addUsersToRoles(userId, ['superadmin','admin','financial-admin','clientsupport-admin','guest-admin']);
    } else {
      throw new Meteor.Error('user-not-found', `User could not be found for ${email}!`);
    }
  },
});
