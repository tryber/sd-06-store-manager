const { Router } = require('express');

const productsModel = require('../models/productsModel');
const {
  validationProductsBody,
  postProducts,
  findIdAndResError
} = require('../services/productsValidations');

const productsRouter = Router();

productsRouter.get('/', async (_req, res) => {
  const arrayAllProducts = await productsModel.getAll();
  const status = 200;
  res.status(status).json({
    products: arrayAllProducts
  });
});

productsRouter.get('/:id', findIdAndResError, async (_req, res) => {
  const status = 200;
  res.status(status).json(res.locals.objProductId);
});

productsRouter.post('/', validationProductsBody, postProducts, async (_req, res) => {
  const status = 201;
  res.status(status).json(res.locals.objAdicionado);
});

module.exports = productsRouter;