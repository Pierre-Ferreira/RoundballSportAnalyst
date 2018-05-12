import SimpleSchema from 'simpl-schema';

Accounts.validateNewUser((user) => {
  if (user.username && user.username.length >= 5) {
    return true;
  } else {
    throw new Meteor.Error(403, 'Username must have at least 5 characters');
  }
});
// Accounts.validateNewUser((user) => {
//   if (user.password && user.password.length >= 5) {
//     return true;
//   } else {
//     console.log('PASSWORD:', user.services.password.bcrypt)
//     throw new Meteor.Error(403, 'Password must have at least 6 characters');
//   }
// });

Accounts.onCreateUser((options, user) => {
  const {
    firstName,
    lastName,
    cellNo,
    introducersUserId,
    walletAddress,
    active,
    joinedDate,
  } = options.userInfo;
  // Validate input.
  if (firstName.length === 0) throw new Meteor.Error(403, 'Member Name is required');
  if (lastName.length === 0) throw new Meteor.Error(403, 'Member Surname is required');
  if (cellNo.length === 0) throw new Meteor.Error(403, 'Cell No is required');
  if (options.email.length === 0) throw new Meteor.Error(403, 'Email is required');
  if (options.username.length === 0) throw new Meteor.Error(403, 'Username is required');
  if (introducersUserId.length === 0) throw new Meteor.Error(403, 'Introducer is required');
  if (walletAddress.length === 0) throw new Meteor.Error(403, 'Bitcoin Wallet Address is required');
  // Generate CLCNo.
  const usersCount = Meteor.users.find().count()
  let beginCLCNo = 1401;
  let clcNo = `CLC${beginCLCNo + usersCount}`;
  // Check for duplicate CLCNo's.
  let duplicateCLCNo = Meteor.users.findOne({ clcNo });
  while (duplicateCLCNo) {
    beginCLCNo += 1;
    clcNo = `CLC${beginCLCNo + usersCount}`;
    duplicateCLCNo = Meteor.users.findOne(clcNo);
  }
  const customizedUser = {
    ...user,
    firstName,
    lastName,
    cellNo,
    introducersUserId,
    walletAddress,
    clcNo,
    active,
    joinedDate,
  };
  return customizedUser;
});
