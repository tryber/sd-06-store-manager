const { ObjectId } = require('mongodb');

const NOT_FOUND = 404;

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  next();
};
