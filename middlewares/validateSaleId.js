function validateSaleId(request, response, next) {
  const { id } = request.params;
  const minimalLength = 24;
  
  if (id.length !==minimalLength) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong sale ID format',
        },
      }
    );
  };

  next();
}

module.exports = validateSaleId;
