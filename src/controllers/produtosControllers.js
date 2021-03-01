const express = require('express');
const rescue = require('express-rescue');
const connection = require('../models/connection');
const productRouter = express.Router();
const { validingName, validingQuantity, validingId }
  = require('../middlewares/validingProducts');
const { createProduct, getAllProduct, getFindById, updateProduct, removeProduct }
  = require('../models/productModel');
const { ObjectId } = require('mongodb');

/** abreviação de status */
const cadastrado = 201;
const tudoCerto = 200;
const deuRuin = 422;

/** Cadastrar produtos */
productRouter.post('/', validingName, validingQuantity, rescue(async (req, res) => {
  const product = req.body;
  const products = await createProduct(product);
  return res.status(cadastrado).send(products);
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
  await res.status(tudoCerto).json(result);
}));

/** atualizando poduto */
productRouter.put('/:id', validingQuantity, validingName, rescue(async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const aux = await getFindById(id);
  if (!aux) res.status(deuRuin).json({
    err: {
      'code': 'invalid_data',
      'message': 'Wrong id format',
    }
  });
  const products = await updateProduct(product, id);
  await res.status(tudoCerto).json(product);
}
)
);

/** apagando produto */
productRouter.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const aux = await getFindById(id);
  if (!aux) res.status(deuRuin).json({
    err: {
      'code': 'invalid_data',
      'message': 'Wrong id format',
    }
  });
  const products = await removeProduct(aux);
  await res.status(tudoCerto).json({ message: 'produto apagado com sucesso' });
}));

module.exports = productRouter;
