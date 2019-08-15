const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const newError = require('./helper');
const { Movies, validate } = require('../models/movies');
const { Genre } = require('../models/genres');

router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('title');
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return newError(res, 400, 'Invalid Genre');

  const movies = new Movies({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movies.save();
  res.send(movies);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);
  const movies = await Movies.findByIdAndUpdate(req.params.id, { title: req.body.title, genre: req.body.genre, numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate }, { new: true });

  if (!movies) return newError(res, 404, 'The movie with this id is not found');

  res.send(movies);
});

router.delete('/:id', auth, async (req, res) => {
  const movies = await Movies.findByIdAndRemove(req.params.id);
  if (!movies) return newError(res, 404, 'The movie with this id is not found');

  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movies = await Movies.findById(req.params.id);
  if (!movies) return newError(res, 404, 'The movie with this id is not found The movie with this id is not found Demi moet douche');

  return res.send(movies);
});

module.exports = router;
