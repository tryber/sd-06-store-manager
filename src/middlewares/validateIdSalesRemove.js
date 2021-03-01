const { ObjectId } = require('mongodb');

const UNPROCESSABLE = 422;

module.exports = (request, response, next) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) return response.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  });
  next();
};
