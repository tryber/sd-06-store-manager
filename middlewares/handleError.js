const { STATUS_CODES: {
  UNPROCESSABLE_ENTITY,
  SERVER_ERROR,
},
ERROR_MESSAGE: { serverError} } = require('../utils/dictionary');

module.exports = (error, _req, res, _next) => {
  const { err } = error || undefined;

  if (err) {
    return res.status(UNPROCESSABLE_ENTITY).json({ err });
  }

  res.status(SERVER_ERROR).json(serverError);
};
