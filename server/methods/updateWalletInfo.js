import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updateWalletInfo(walletInfo) {
    check(walletInfo, {
      walletAddress: String,
    });
    if (walletInfo.walletAddress.length === 0) throw new Meteor.Error(403, 'Wallet address is required');
    const { userId } = this;
    Meteor.users.update(userId, {
      $set: {
        walletAddress: walletInfo.walletAddress,
      },
    });
  },
});
