const express = require('express');
const productRouter = express.Router();

const { createProduct } = require('../models/productModel');

/** abreviação de status */
const cadastrado = 201;
const tudoCerto = 200;
const nunVi = 404;
const deuRuim = 500;

/** rota para cadastro de produtos */
productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const retorno = await createProduct({name, quantity});
  return res.status(cadastrado).send(retorno);
});

/** listando todos os produtos */
productRouter.get('/', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'listando todos os produtos' });
});

/** listando produtos por id */
productRouter.get('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'listando um produto por id' });
});

/** atualizando poduto */
productRouter.put('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'atualizando produto' });
});

/** apagando produto */
productRouter.delete('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'apagando produto' });
});

module.exports = productRouter;
