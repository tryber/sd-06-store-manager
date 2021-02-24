const { Router } = require('express');
const {
  validationProductsBody,
  postProducts
} = require('../services/productsValidations');

const productsRouter = Router();

productsRouter.post('/', validationProductsBody, postProducts, async (_req, res) => {
  console.log('chegou no final');
  const status = 201;
  res.status(status).json(res.locals.objAdicionado);
});

module.exports = productsRouter;