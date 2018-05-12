import { Mongo } from 'meteor/mongo';

const MonthEndPayments = new Mongo.Collection('month_end_payments');

export default MonthEndPayments;
