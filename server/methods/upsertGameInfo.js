import { Meteor } from 'meteor/meteor';

Meteor.methods({
  upsertGameInfo(gameInfo) {
    check(gameInfo, {
      emailNew: String,
      emailOld: String,
    });
    if (gameInfo.emailNew.length === 0) throw new Meteor.Error(403, 'Member Email is required');

  },
});
