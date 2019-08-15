const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    costumer: {
      type: new mongoose.Schema({
        isGold: {
          type: Boolean,
          required: true,
          min: 5,
          max: 50
        },
        name: {
          type: String,
          required: true,
          min: 5,
          max: 50
        },
        phone: {
          type: String,
          required: true,
          min: 5,
          max: 50
        }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          min: 5,
          max: 255
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

const validateRental = rental => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;
