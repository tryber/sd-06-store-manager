const express = require('express');
const rescue = require('express-rescue');
const connection = require('../models/connection');
const productRouter = express.Router();
const { validingName, validingQuantity, validingId }
  = require('../middlewares/validingProducts');
const { createProduct, getAllProduct, getFindById, updateProduct }
  = require('../models/productModel');
const { ObjectId } = require('mongodb');

/** abreviação de status */
const cadastrado = 201;
const tudoCerto = 200;

/** Cadastrar produtos */
productRouter.post('/', validingName, validingQuantity, rescue(async (req, res) => {
  const product = req.body;
  const products = await createProduct(product);
  return res.status(cadastrado).send( products );
}));

/** listando todos os produtos */
productRouter.get('/', async (req, res) => {
  const products = await getAllProduct();
  return res.status(tudoCerto).json({ products });
});

/** listando produtos por id */
productRouter.get('/:id', validingId, rescue(async (req, res) => {
  const { id } = req.params;
  const result = await getFindById(id);
  await res.status(tudoCerto).json( result );
}));

/** atualizando poduto */
productRouter.put('/:id', validingName, validingQuantity, async (req, res) => {
  const { id } = req.params;
  const product = await getFindById(ObjectId(id));
  console.log(product);
  const products = await updateProduct(product);
  await res.status(tudoCerto).json(products);
});

/** apagando produto */
productRouter.delete('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'apagando produto' });
});

module.exports = productRouter;
