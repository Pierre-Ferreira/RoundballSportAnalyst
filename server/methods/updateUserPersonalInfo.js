import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updateUserPersonalInfo(userPersonalInfo) {
    check(userPersonalInfo, {
      firstName: String,
      lastName: String,
      cellNo: String,
    });
    if (userPersonalInfo.firstName.length === 0) throw new Meteor.Error(403, 'Member Name is required');
    if (userPersonalInfo.lastName.length === 0) throw new Meteor.Error(403, 'Member Surname is required');
    if (userPersonalInfo.cellNo.length === 0) throw new Meteor.Error(403, 'Cell No is required');
    const { userId } = this;
    Meteor.users.update(userId, {
      $set: {
        firstName: userPersonalInfo.firstName,
        lastName: userPersonalInfo.lastName,
        cellNo: userPersonalInfo.cellNo,
      },
    });
  },
});
