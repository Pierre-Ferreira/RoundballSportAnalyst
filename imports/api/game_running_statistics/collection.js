import { Mongo } from 'meteor/mongo';

const GameRunningStatistics = new Mongo.Collection('game_running_statistics');

export default GameRunningStatistics;
