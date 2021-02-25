const express = require('express');
const ProductsModel = require('../models/ProductsModel');
const validate = require('../utils/validate');
const { ObjectId } = require('mongodb');

const productsRouter = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const INVALID = 422;

productsRouter.get('/', async (_req, res) => {
  const getProducts = await ProductsModel.getAll();
  res.status(SUCCESS).json(getProducts);
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const valId = ObjectId.isValid(id);
  
  if (!valId) {
    return res.status(INVALID).json({ err: 
      {code: 'invalid_data', message: 'Wrong id format'}});
  };
    
  const productByID = await ProductsModel.getById(ObjectId(id));

  if (!productByID) {
    return res.status(INVALID).json({ err: 
      {code: 'invalid_data', message: 'Wrong id format'}});
  };

  return res.status(SUCCESS).json(productByID);
});
    
productsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  if (await validate.validateProducts(res, name, quantity)) {
    const { insertedId } = await ProductsModel.create(name, quantity);
    const newProduct = { _id: insertedId, name, quantity };
    res.status(CREATED).json(newProduct);
  }
});

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  if (await validate.validateUpdateProducts(res, name, quantity)) {
    const ok = await ProductsModel.update(name, quantity, id);
    res.status(SUCCESS).json(ok);
  }
});


module.exports = productsRouter;