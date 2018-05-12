import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getDownLineDB() {
    const { userId } = this;
    const downlineInfo = Meteor.users.find(
      { introducersUserId: userId },
      {
        fields: {
          firstName: 1,
          lastName: 1,
          cellNo: 1,
          emails: 1,
          active: 1,
          clcNo: 1,
          joinedDate: 1,
        },
      },
    ).fetch();
    console.log('downlineInfo:', downlineInfo);
    return downlineInfo;
  },
});
