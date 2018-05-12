import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getUserInfoDB() {
    const userID = this.userId;
    const userInfo = Meteor.users.find(
      {'_id': userID},
      {
        fields: {
          firstName: 1,
          lastName: 1,
          username: 1,
          emails: 1,
          cellNo: 1,
          introducersUserId: 1,
          walletAddress: 1,
          active: 1,
          clcNo: 1,
          joinedDate: 1,
        },
      },
    ).fetch();
    console.log('userInfo:', userInfo);
    return userInfo;
  },
});
