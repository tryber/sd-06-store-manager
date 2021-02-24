const { Router } = require('express');
const { create, 
  getProductCount, 
  getAll, 
  getProductById } = require('../models/ProductModel');

const {ObjectId} = require('mongodb');

const ProductsController = new Router();
const STATUS_CREATED = 201;
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE= 422;
const MIN_LENGTH = 5;
const ZERO = 0;

ProductsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;
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

ProductsController.get('/', async (req, res) => { 
  const allProducts = await getAll();
  return res.status(STATUS_OK).json({'products': allProducts});
});

ProductsController.get('/:id', async (req, res) => {
  const id = req.params.id;
  if(ObjectId.isValid(id)){
    const product = await getProductById(id);
    return res.status(STATUS_OK).json(product);
  }
  return res.status(STATUS_UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }});;
});


module.exports = ProductsController;