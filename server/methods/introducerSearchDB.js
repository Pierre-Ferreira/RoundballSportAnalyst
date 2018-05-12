import { Meteor } from 'meteor/meteor';
import moment from 'moment/moment';
import Fuse from 'fuse.js';

Meteor.methods({
  introducerSearchDB(searchValue) {
    check(searchValue, String);
    const allUsers = Meteor.users.find(
      {},
      { fields: { firstName: 1, lastName: 1, clcNo: 1 } },
    ).fetch();
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'firstName',
        'lastName',
        'clcNo',
      ],
    };
    const fuse = new Fuse(allUsers, options);
    const result = fuse.search(searchValue);
    return result;
  },
});
