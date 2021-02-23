const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const productsRouter = Router();
const SUCCESS = 200;

productsRouter.get('/', async (_req, res) => {
  const result = await ProductsService.getAll();

  return res.status(SUCCESS).json(result);
});

productsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const isError = await ProductsService.insertProduct(name, quantity);

  if (isError && isError.payload) {
    const { payload: { err }, error } = isError;

    return res.status(error.status).json({ err });
  }

  const { ops } = isError; 
  return res.status(SUCCESS).json(...ops);
});

module.exports = productsRouter;
