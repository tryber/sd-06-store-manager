const { Router } = require('express');
const product = require('../models/product');

const routerProduct = new Router();
const SUCCESS = 200;

routerProduct.get('/', async (_req, res)=>{
  
  const products = await product.getAll();
  console.log({products});
  res.status(SUCCESS).json(products);

});

routerProduct.post('/', async (req, res)=>{
  const { name, quantity } = req.body;
  const { insertId } = await product.createProduct(name, quantity);
  console.log({insertId});
  const newProduct = {
    id: insertId,
    name,
    quantity
  };
  res.status(SUCCESS).json(newProduct);
});

module.exports = routerProduct;
