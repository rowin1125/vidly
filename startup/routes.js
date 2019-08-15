const express = require('express');

const genres = require('../routes/genres');
const customers = require('../routes/customers');
const home = require('../routes/home');
const movies = require('../routes/movies');
const rental = require('../routes/rental');
const users = require('../routes/user');
const auth = require('../routes/auth');

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/', home);
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rental);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);

  app.use((req, res, next) => {
    console.log('MiddleWare logging...');
    next();
  });

  app.use((req, res, next) => {
    console.log('Authenticating..');
    next();
  });
};
