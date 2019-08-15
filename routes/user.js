const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const newError = require('./helper');
const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const { User, validate } = require('../models/user');
require('dotenv').config({ path: 'variables.env' });

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  console.log(user);
  res.send(user);
});

router.get('/', async (req, res) => {
  const user = await User.find().sort('theme');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return newError(res, 400, 'User is already in the database');

  const { name, email, password } = req.body;
  user = new User({
    name,
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth.token', token).send({ name: user.name, email: user.email });
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return newError(res, 400, error.details[0].message);
  const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email, password: req.body.password }, { new: true });

  if (!user) return newError(res, 404, 'The user with this id is not found');

  res.send(pick(user, ['name', 'email']));
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return newError(res, 404, 'The user with this id is not found');

  res.send(user);
});

module.exports = router;
