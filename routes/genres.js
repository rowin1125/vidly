const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genres');
const newError = require('./helper');

router.get('/', async (req, res, next) => {
  const genres = await Genre.find().sort('theme');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  const genre = new Genre({ theme: req.body.theme });

  await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, { theme: req.body.theme }, { new: true });

  if (!genre) return newError(res, 404, 'The genre with this id is not found');

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  console.log('activated');
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return newError(res, 404, 'The genre with this id is not found');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return newError(res, 404, 'The genre with this id is not found The genre with this id is not found Demi moet douche');

  return res.send(genre);
});

module.exports = router;
