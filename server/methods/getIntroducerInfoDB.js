import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getIntroducerInfoDB(introducersUserId) {
    check(introducersUserId, String)
    const introducersInfo = Meteor.users.find(
      {'_id': introducersUserId},
      {
        fields: {
          firstName: 1,
          lastName: 1,
          clcNo: 1,
        },
      },
    ).fetch();
    console.log('introducersInfo:', introducersInfo);
    return introducersInfo;
  },
});
