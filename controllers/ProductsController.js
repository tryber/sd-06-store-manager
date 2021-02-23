const { Router } = require('express');
const ProductService = require('../services/ProductsService');
const ProductController = new Router();

const STATUS_422 = 422;
const STATUS_201 = 201;

ProductController.post('/', async(request, response) => {
  const { name, quantity } = request.body;
  const verifyField = await ProductService.verifyAll(name, quantity);
  if (!verifyField.verifiedName)return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: '"name" length must be at least 5 characters long' }
  });
  if (verifyField.verifiedSameName) return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: 'Product already exists'}
  });
  if(verifyField.verifiedQuantity === null) return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: '"quantity" must be a number' }
  });
  if (!verifyField.verifiedQuantity) return response.status(STATUS_422).json({ err:
    { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'}
  });
  const add = await ProductService.addProd(name, quantity);
  return response.status(STATUS_201).json(add);

});

module.exports = ProductController;
