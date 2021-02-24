module.exports = (err, _req, res, _next) => {
  const fiveHundred = 500;
  res.status(err.statusCode || fiveHundred).json(err.message);
};
