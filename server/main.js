import { Meteor } from 'meteor/meteor';
import '../imports/startup/server';

Meteor.startup(() => {
  // 1. Set up stmp. TODO! NOTE! For security smtps should be used, but it does not work in dev enviroment.
  process.env.MAIL_URL = 'smtp://' +
      encodeURIComponent(Meteor.settings.private.username) + ':' +
      encodeURIComponent(Meteor.settings.private.password) + '@' +
      encodeURIComponent(Meteor.settings.private.server) + ':' + Meteor.settings.private.port;

});
