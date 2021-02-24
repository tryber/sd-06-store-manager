const ProductsService = require('../services/ProductsService');

async function checkProductRepetition(request, response, next) {
  const { name } = request.body;
  const product = await ProductsService.findByName(name);

  if (product) {
    next(
      {
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists',
        },
      }
    );
  }
  next();
}

module.exports = checkProductRepetition;
