import { Meteor } from 'meteor/meteor';

// This is to prevent a user from modifying his profile however he wishes with client side methods.
Meteor.users.deny({
  update() { return true; },
});
