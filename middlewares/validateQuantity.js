function validateProductQuantity(request, response, next) {
  const { quantity } = request.body;
  const minimalQuantity = 0;

  if (quantity <= minimalQuantity ) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1',
        },
      }
    );
  }

  if (typeof quantity !== 'number' ) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number',
        },
      }
    );
  }
  next();
}

module.exports = validateProductQuantity;
