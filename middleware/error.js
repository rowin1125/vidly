const newError = require('../routes/helper');
const winston = require('winston');

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);
  newError(res, 500, 'Oeps something went wrong...');
};
