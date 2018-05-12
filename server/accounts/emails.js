import { Accounts } from 'meteor/accounts-base';
Accounts.emailTemplates.siteName = 'CryptoLearingClub';
Accounts.emailTemplates.from = 'CryptoLearingClub <admin@cryptolearingclub.co.za>';

// Email template for verification emails.
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return '[CryptoLearingClub] Verify Your Email Address';
  },
  text(user, url) {
    // Do not remove the # out of url or change verification url!
    const emailAddress = user.emails[0].address;
    const supportEmail = 'admin@cryptolearingclub.co.za';
    const emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${url}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  },
};

// Email template for reset-password emails.
Accounts.emailTemplates.resetPassword = {
  subject() {
    return '[CryptoLearingClub] Reset your password';
  },
  text(user, url) {
    const emailAddress = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');
    const urlCorrect = urlWithoutHash.replace('/reset-password', '/auth/reset-password');
    const supportEmail = 'admin@cryptolearingclub.co.za';
    const emailBody = `To reset the password for (${emailAddress}) visit the following link:\n\n${urlCorrect}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
    return emailBody;
  },
};
