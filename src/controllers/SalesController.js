const { Router } = require('express');
const SalesService = require('../services/SalesService');
const rescue = require('express-rescue');
const { v } = require('../../variables');
const Product = require('../models/Product');

const router = Router();

// '/' aqui na verdade é '/sales' 
router.get('/', rescue (async (req, res) => {
  const products = await SalesService.getAll();
  
  return res.status(v.OK).json(products);
}));

// middleware de validação
const validateProduct = async (req, res, next) => {
  const products = req.body;
  
  let exists = [];
  for (let i = v.ZERO; i < products.length; i++) {
    exists.push(await Product.findById(products[i].productId));
    
    const quantity = products[i].quantity;
    
    if (quantity < 1 || quantity === v.ZERO || typeof quantity !== 'number') 
      return res.status(v.UNPROCESSABLE_ENTITY)
        .json({ 
          err: {
            code: 'invalid_data',
            message: 'Wrong product ID or invalid quantity'
          }
        });
  }
  
  if (exists.includes(null)) res.status(v.UNPROCESSABLE_ENTITY)
    .json({
      err: {
        code: 'invalid_data',
        message: 'one or more products associated with this sale don\'t exist'
      }
    });
  else {
    next();
  }
};

router.post('/', validateProduct,  rescue (async (req, res) => {
  const sale = await SalesService.create(req.body);
  
  if (sale) return res.status(v.OK).json(sale);
}));

module.exports = router;
