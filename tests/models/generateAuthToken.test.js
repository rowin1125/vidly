const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
  const newUser = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
  it('should return an auth Token ', () => {
    const user = new User(newUser);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    expect(decoded).toMatchObject(newUser);
  });
});
