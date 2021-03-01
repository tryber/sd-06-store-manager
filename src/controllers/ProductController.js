const { Router } = require('express');
const ProductService = require('../services/ProductService');
const rescue = require('express-rescue');

const router = Router();

// middleware de validação
const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  
  if (!name || !quantity) res.status(process.env.badRequest)
    .json({ message: 'Product must have the keys "name" and "quantity"' });
  if (name.length < process.env.five) res.status(process.env.unprocessableEntity)
    .json({ message: '"name" length must be at least 5 characters long' });
  if (quantity < 1) res.status(process.env.unprocessableEntity)
    .json({ message: '"quantity" must be larger than or equal to 1' });
  if (typeof quantity !== 'number') res.status(process.env.unprocessableEntity)
    .json({ message: '"quantity" must be a number' });
  else {
    next();
  }
};

// '/' aqui na verdade é '/products'
router.post('/', validateProduct, rescue (async (req, res) => {
  const { name, quantity } = req.body;
  const store = await ProductService.create(name, quantity);
  
  if (!store) return res.status(process.env.unprocessableEntity)
    .json({ message: 'Product already exists' });
  
  res.status(process.env.ok).json(store);
}));

router.get('/', rescue (async (req, res) => {
  const products = await ProductService.getAll();
  
  res.status(process.env.ok).json(products);
}));

module.exports = router;
