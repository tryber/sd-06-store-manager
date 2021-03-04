const { Router } = require('express');
const SalesService = require('../services/SalesService');
const rescue = require('express-rescue');
const { v } = require('../../variables');
const Product = require('../models/Product');

const router = Router();

// '/' aqui na verdade é '/sales' 
router.get('/', rescue (async (req, res) => {
  const sales = await SalesService.getAll();
  
  return res.status(v.OK).json({ sales });
}));

router.get('/:id', rescue (async (req, res) => {
  const { id } = req.params;
  
  if (id.length !== v.TWENTY_FOUR) {
    return res.status (v.NOT_FOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
  }
  
  const sale = await SalesService.findById(id);
  
  if (!sale) {
    return res.status (v.NOT_FOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
  }
  return res.status(v.OK).json({ sale });
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

router.put('/:id', validateProduct, rescue (async (req, res) => {
  const { productId, quantity } = req.body[0];
  const { id } = req.params;
  
  const sale = await SalesService.update(productId, quantity, id);
  
  return res.status(v.OK).json(sale);
}));

router.post('/', validateProduct,  rescue (async (req, res) => {
  const myProductId = req.body[0].productId;
  const myProduct = await Product.findById(myProductId);
  
  if (req.body[0].quantity > myProduct.quantity) return res.status(v.NOT_FOUND)
    .json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  
  const sale = await SalesService.create(req.body);
  
  const newQuantity = req.body[0].quantity;
  Product.updateQuantity(myProduct._id, newQuantity, '-');
  
  if (sale) return res.status(v.OK).json(sale);
}));

router.delete('/:id', rescue (async (req, res) => {
  const { id } = req.params;
  
  if (id.length !== v.TWENTY_FOUR) {
    return res.status (v.UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format'
        }
      });
  }
  
  const mySale = await SalesService.findById(id);
  
  if (!mySale) return res.status(v.UNPROCESSABLE_ENTITY)
    .json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  else {
    const { quantity } = mySale.itensSold[0];
    const { productId } = mySale.itensSold[0];
    const myProduct = await Product.findById(productId);
    
    const sale = await SalesService.remove(id);
    
    Product.updateQuantity(myProduct._id, quantity, '+');
    
    return res.status(v.OK).json(sale);
  }
}));

module.exports = router;
