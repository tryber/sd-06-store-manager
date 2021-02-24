const Product = require('../models/Product');
const minimalLength = 5;

function validateProductName(request, response, next) {
  const { name } = request.body;
  if (name.length < minimalLength) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long',
        },
      }
    );
  }

  next();
}

module.exports = validateProductName;
