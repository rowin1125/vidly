const express = require('express');
const router = express.Router();
const newError = require('./helper');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
require('dotenv').config({ path: 'variables.env' });

const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const user = await User.find().sort('theme');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return newError(res, 400, 'Invalid email or password');

  const validatePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validatePassword) return newError(res, 400, 'Invalid email or password');

  const token = user.generateAuthToken();

  res.send(token);
});

const validate = req => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(req, schema);
};

module.exports = router;
