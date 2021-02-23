const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();
const ProductsService = require('../service/ProductsService');
const SUCCSESS = 201;
const ERROR = 422;
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

  const newProduct = await ProductsService.createProduct(name, quantity);
  return res.status(SUCCSESS).json({ name, quantity });
}));

module.exports = router;
