const { Router } = require('express');
const { create, update, exclude } = require('../models/ProductModel');
const { getProductCount, getAll, getById } = require('../models/ProductModel');
const { ObjectId } = require('mongodb');

const ProductsController = new Router();

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOTFOUND= 400;
const STATUS_UNPROCESSABLE= 422;
const MIN_LENGTH = 5;
const ZERO = 0;

// Requisito 1
ProductsController.post('/', async (req, res) => {
  const { name, quantity} = req.body;
  const countProduct = await getProductCount(name);
  if (name.length <= MIN_LENGTH) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  } 
  if (countProduct > ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  
  const register = await create(name, quantity);

  return res.status(STATUS_CREATED).json(register);
});

// Requisito 2
ProductsController.get('/', async (_req, res) => {
  const products = await getAll();

  return res.status(STATUS_OK).json({products});
});

ProductsController.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
  const product = await getById(id);
  if (!product) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
  return res.status(STATUS_OK).json(product);
});

// Requisito 3
ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  if (name.length <= MIN_LENGTH) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  await update(id, name, quantity);
  const updatedProduct = await getById(id);
  return res.status(STATUS_OK).json(updatedProduct);
});

// Requisito 4
ProductsController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
  const deletedProduct = await getById(id);
  await exclude(id);
  return res.status(STATUS_OK).json(deletedProduct);
});

module.exports = ProductsController;