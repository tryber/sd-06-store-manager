const { Router } = require('express');
const {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../models/Products');
const { validateInsertData } = require('../services/ProductsServices');

const ProductsRouter = new Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const validationResult = await validateInsertData(name, quantity);

  if (validationResult === 'is valid') {
    const product = await registerProduct(name, quantity);

    return res.status(CREATED).json(product);
  }

  return res.status(UNPROCESSABLE_ENTITY).json(validationResult);
});

ProductsRouter.get('/', async (_req, res) => {
  const products = await getProducts();
  const result = { products };

  return res.status(OK).json(result);
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    return res.status(OK).json(product);
  } catch (error) {
    console.log(error);
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });    
  }
});

ProductsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const validationResult = await validateInsertData(name, quantity);
  
  if (validationResult === 'is valid') {
    try {
      const updated = await updateProduct(name, quantity, id);
      
      return res.status(OK).json(updated);
    } catch (error) {
      console.log(error);

      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });    
    }
  }

  return res.status(UNPROCESSABLE_ENTITY).json(validationResult);
});

ProductsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteProduct(id);

    return res.status(OK).json(deleted);
  } catch (error) {
    console.log(error);

    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });    
  }
});

module.exports = ProductsRouter;
