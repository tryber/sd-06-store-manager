const { Router } = require('express');

const productsModel = require('../models/productsModel');
const {
  validationProductsBodyAndNameExists,
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

productsRouter.post('/',
  validationProductsBodyAndNameExists,
  postProducts,
  async (_req, res) => {
    const status = 201;
    res.status(status).json(res.locals.objAdicionado);
  }
);

productsRouter.put('/:id',
  validationProductsBody,
  async (_req, res) => {
    const status = 200;
    res.status(status).json();
  }
);

module.exports = productsRouter;