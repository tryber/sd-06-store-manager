const { Router, request, response } = require('express');
const ProductService = require('../services/ProductsService');
const ProductController = new Router();
const rescue = require('express-rescue');

const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_404 = 404;

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

ProductController.get('/', async (_request, response) => {
  const allProd = await ProductService.getProd();
  return response.status(STATUS_200).json({ products: allProd });
});

ProductController.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const productId = await ProductService.getProdById(id);
    if (!productId) throw new Error('error');
    return response.status(STATUS_200).json(productId);
  } catch (err) {
    return response.status(STATUS_200).json({ err:
      { code: 'invalid_data', message: 'Wrong id format' }
    });
  }
});

module.exports = ProductController;
