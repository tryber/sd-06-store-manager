const { ObjectId } = require('mongodb');

const UNPROCESSABLE = 422;

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  });
  next();
};
