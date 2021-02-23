const { Router } = require('express');
const rescue = require('express-rescue');

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
  let product;
  try {
    product = await ProductsService.getById(id);
  } catch (err) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }
  if (!product) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  res.status(SUCCESS).json(product);
}));

router.put('/products/:id', rescue (async (req, res) => {
  const { id } = req.params;
}));

module.exports = router;
