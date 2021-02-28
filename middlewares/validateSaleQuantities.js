function validateSaleQuantities(request, response, next) {
  const productsSold = request.body;
  productsSold.forEach((product) => {
    const minimalQuantity = 0;
    if (product.quantity <= minimalQuantity) {
      next(
        {
          'err': {
            'code': 'invalid_data',
            'message': 'Wrong product ID or invalid quantity',
          },
        }
      );
    }

    if (typeof product.quantity !== 'number') {
      next(
        {
          'err': {
            'code': 'invalid_data',
            'message': 'Wrong product ID or invalid quantity',
          },
        }
      );
    }
  });
  next();
}

module.exports = validateSaleQuantities;
