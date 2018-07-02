import { Mongo } from 'meteor/mongo';

const TokensTransactions = new Mongo.Collection('tokens_transactions');

export default TokensTransactions;
