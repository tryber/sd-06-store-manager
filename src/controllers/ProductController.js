const { Router } = require('express');
const ProductService = require('../services/ProductService');
const rescue = require('express-rescue');
const { v } = require('../../variables');


const router = Router();

// middleware de validação
const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  
  if (name === null || quantity === null) 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .json({ message: 'Product must have the keys "name" and "quantity"' });
  else if (name.length < v.FIVE) 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .send({ 
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        } 
      });
  else if (quantity < 1 || quantity === v.ZERO) 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .json({ 
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        }
      });
  else if (typeof quantity !== 'number') 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .json({ 
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        }
      });
  else {
    next();
  }
};

// '/' aqui na verdade é '/products' 
router.post('/', validateProduct, rescue (async (req, res) => {
  const { name, quantity } = req.body;
  const store = await ProductService.create(name, quantity);
  
  if (!store) return res.status(v.UNPROCESSABLE_ENTITY)
    .json({ 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  else {
    return res.status(v.CREATED).json(store);    
  }
}));

router.get('/', rescue (async (req, res) => {
  const products = await ProductService.getAll();
  
  return res.status(v.OK).json({products});
}));

router.get('/:id', rescue (async (req, res) => {
  const { id } = req.params;
  
  if (id.length !== v.TWENTY_FOUR) 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
  
  const product = await ProductService.findById(id);
  
  if (!product) 
    return res.status(v.UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
  else return res.status(v.OK).json(product);
}));

module.exports = router;
