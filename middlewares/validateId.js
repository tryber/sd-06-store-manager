function validateId(request, response, next) {
  const { id } = request.params;
  const minimalLength = 24;
  
  if (id.length !==minimalLength) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong id format',
        },
      },
    );
  };

  next();
}

module.exports = validateId;
