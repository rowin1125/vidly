const mongoose = require('mongoose');
const winston = require('winston');

const db = process.env.DB_DEV;

module.exports = function() {
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}..`));
};
