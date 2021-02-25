const { STATUS_CODES: {
  UNPROCESSABLE_ENTITY,
  NOT_FOUND
} } = require('../utils/dictionary');

module.exports = ({ err }, _req, res, _next) => {
  if (err.code === 'not_found') res.status(NOT_FOUND).json({ err });
  res.status(UNPROCESSABLE_ENTITY).json({ err });
};
