const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Genre = require('./genres');

const Movies = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 255
    },
    genre: {
      type: Genre,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

const validateMovies = movies => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };
  return Joi.validate(movies, schema);
};

exports.Movies = Movies;
exports.validate = validateMovies;
