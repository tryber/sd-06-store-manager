const { ObjectId } = require('mongodb');

const NOT_FOUND = 404;

module.exports = (request, response, next) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) return response.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  next();
};
