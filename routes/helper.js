const newError = (res, num, msg) => {
  res.status(num).send(msg);
};

module.exports = newError;
