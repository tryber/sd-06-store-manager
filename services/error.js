module.exports = (err, _req, res, _next) => {
  const fiveHundred = 500;
  console.log(err);
  res.status(err.code || fiveHundred).json({ message: err.message });
};
