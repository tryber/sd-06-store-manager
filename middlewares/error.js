const boom = require('boom');

const internalError = 500;

module.exports = (err, _req, res, _next) => {
  console.log(err);
  if(boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  res.status(internalError).json({ message: err.message });
};
