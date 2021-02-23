const { Router } = require('express');
const { registerProduct, getProducts, getProductById } = require('../models/Products');
const ProductsServices = require('../services/ProductsServices');

const ProductsRouter = new Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  if (!ProductsServices.nameLengthValidator(name)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (!ProductsServices.uniqueNameValidator(name)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  if (!ProductsServices.quantityValueValidator(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if (!ProductsServices.quantityValueValidator(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const product = await registerProduct(name, quantity);

  return res.status(CREATED).json(product);
});

ProductsRouter.get('/', async (_req, res) => {
  const products = await getProducts();

  return res.status(OK).json(products);
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    return res.status(OK).json(product);    
  } catch (_error) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });    
  }
});

module.exports = ProductsRouter;
