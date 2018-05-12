import { Accounts } from 'meteor/accounts-base';

Accounts.validateLoginAttempt((options) => {
  /* options:
        type            (String)    The service name, such as "password" or "twitter".
        allowed         (Boolean)   Whether this login is allowed and will be successful.
        error           (Error)     When allowed is false, the exception describing why the login failed.
        user            (Object)    When it is known which user was attempting to login, the Meteor user object.
        connection      (Object)    The connection object the request came in on.
        methodName      (String)    The name of the Meteor method being used to login.
        methodArguments (Array)     An array of the arguments passed to the login method
    */

  // Just return true if the user has just been created.
  if (options.methodName === 'createUser') {
    return true;
  }

  // If the login has failed, just return false.
  if (!options.allowed) {
    return false;
  }

  // Check the user's email is verified. If users may have multiple
  // email addresses (or no email address) you'd need to do something
  // more complex.
  if (options.user && options.user.emails[0] && options.user.emails[0].verified === true) {
    return true;
  } else {
    throw new Meteor.Error('email-not-verified', 'You must verify your email address before you can log in.');
  }
});
