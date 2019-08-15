const express = require('express');
const router = express.Router();
const newError = require('./helper');
const { Customer, validate } = require('../models/customer');

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort('theme');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(req.params.id, { theme: req.body.theme }, { new: true });

  if (!customer) return newError(res, 404, 'The customer with this id is not found');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return newError(res, 404, 'The customer with this id is not found');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return newError(res, 404, 'The customer with this id is not found The customer with this id is not found Demi moet douche');

  return res.send(customer);
});

module.exports = router;
