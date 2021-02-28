const NOT_FOUND = 404;

function validateSaleIdWORKAROUND(request, response, next) {
  const { id } = request.params;
  const minimalLength = 24;
  
  if (id.length !==minimalLength) {
    return response.status(NOT_FOUND).json({
      'err': {
        'code': 'not_found',
        'message': 'Sale not found',
      },
    });
  };

  next();

}

module.exports = validateSaleIdWORKAROUND;
