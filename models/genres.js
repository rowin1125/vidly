const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    theme: {
      type: String,
      required: true,
      min: 5,
      max: 50
    }
  })
);

const validateGenre = genre => {
  const schema = {
    theme: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
};

exports.Genre = Genre;
exports.validate = validateGenre;
