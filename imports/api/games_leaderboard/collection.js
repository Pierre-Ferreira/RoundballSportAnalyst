import { Mongo } from 'meteor/mongo';

const GamesLeaderboard = new Mongo.Collection('games_leaderboard');

export default GamesLeaderboard;
