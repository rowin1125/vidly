const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
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
  })
);

const validateCustomer = customer => {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.number().required()
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
