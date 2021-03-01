const { Router } = require('express');
const ProductService = require('../services/ProductService');
const rescue = require('express-rescue');
require('../../.env');

const router = Router();

// middleware de validação
const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  
  if (name === null || quantity === null) return res.status(unprocessableEntity)
    .json({ message: 'Product must have the keys "name" and "quantity"' });
  else if (name.length < five) return res.status(unprocessableEntity)
    .send({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      } 
    });
  else if (quantity < 1 || quantity === zero) res.status(unprocessableEntity)
    .json({ 
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  else if (typeof quantity !== 'number') res.status(unprocessableEntity)
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
  
  if (!store) return res.status(unprocessableEntity)
    .json({ 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  else {
    res.status(created).json(store);    
  }
}));

router.get('/', rescue (async (req, res) => {
  const products = await ProductService.getAll();
  
  res.status(ok).json(products);
}));

router.get('/:id', rescue (async (req, res) => {
  const { id } = req.params;
  
  if (id.length !== twentyFour) return res.status(unprocessableEntity)
    .json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  
  const product = await ProductService.findById(id);
  
  if (!product) return res.status(unprocessableEntity)
    .json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  else return res.status(ok).json(product);
}));

module.exports = router;
