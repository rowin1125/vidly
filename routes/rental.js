const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');

const newError = require('./helper');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movies } = require('../models/movies');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('theme');
  res.send(rental);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return newError(res, 400, 'No customer found');

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return newError(res, 400, 'No movie found');

  if (movie.numberInStock === 0) return newError(res, 400, 'Movie not available atm');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update(
        'movies',
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();
  } catch (error) {
    newError(error, 500, 'Oeps something went wrong on the server..');
  }

  res.send(rental);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);
  const rental = await Rental.findByIdAndUpdate(req.params.id, { theme: req.body.theme }, { new: true });

  if (!rental) return newError(res, 404, 'The rental with this id is not found');

  res.send(rental);
});

router.delete('/:id', auth, async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental) return newError(res, 404, 'The rental with this id is not found');

  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return newError(res, 404, 'The rental with this id is not found The rental with this id is not found Demi moet douche');

  return res.send(rental);
});

module.exports = router;
