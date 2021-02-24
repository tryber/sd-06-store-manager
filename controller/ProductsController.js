const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const router = Router();
const ProductsService = require('../service/ProductsService');
const OK = 201;
const ERROR = 422;
const SUCCESS = 200;
const nameLength = 5;
const ZERO = 0;

router.post('/products', rescue (async (req, res) => {
  const { name, quantity } = req.body;
  const data = await ProductsService.getAll();

  const includeName = data.every((item) => item.name !== name);

  if (!includeName) {
    return res.status(ERROR)
      .json({err: { code: 'invalid_data', message: 'Product already exists' }});
  }
  if (name.length < nameLength) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      } });
  }
  if (quantity <= ZERO) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      } });
  }
  if (typeof quantity !== 'number') {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: '"quantity" must be a number' 
      } });
  }

  const insertedId = await ProductsService.createProduct(name, quantity);
  return res.status(OK).json({ _id:insertedId, name, quantity });
}));

router.get('/products', rescue (async (_req, res) => {
  const allProducts = await ProductsService.getAll();
  res.status(SUCCESS).json({ products:allProducts });
}));

router.get('/products/:id', rescue(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }
  product = await ProductsService.getById(id);

  if (!product) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  return res.status(SUCCESS).json(product);
}));

router.put('/products/:id', rescue (async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if (name.length < nameLength) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      } });
  }
  if (quantity <= ZERO) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      } });
  }
  if (typeof quantity !== 'number') {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: '"quantity" must be a number' 
      } });
  }

  const insertedId = await ProductsService.updateProduct(id, name, quantity);
  return res.status(SUCCESS).json({ _id:insertedId, name, quantity });
}));

router.delete('/products/:id', rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  const deletedProduct = await ProductsService.getById(id);

  if (!deletedProduct) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  await ProductsService.deleteProduct(id);
  res.status(SUCCESS).json(deletedProduct);
}));

module.exports = router;
