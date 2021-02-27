const { Router } = require('express');

const productsModel = require('../models/productsModel');
const {
  validationNameExists,
  validationProductsBody,
  postProducts,
  findIdAndTreatError,
  updateProductAndFindIdAndTreatError,
  deleteProductAndFindIdAndTreatError
} = require('../services/productsValidations');

const productsRouter = Router();

productsRouter.get('/', async (_req, res) => {
  const arrayAllProducts = await productsModel.getAll('products');
  const status = 200;
  res.status(status).json({
    products: arrayAllProducts
  });
});

productsRouter.get('/:id', findIdAndTreatError, async (_req, res) => {
  const status = 200;
  res.status(status).json(res.locals.objProductId);
});

productsRouter.post('/',
  validationNameExists,
  validationProductsBody,
  postProducts,
  async (_req, res) => {
    const status = 201;
    res.status(status).json(res.locals.objAdicionado);
  }
);

productsRouter.put('/:id',
  validationProductsBody,
  updateProductAndFindIdAndTreatError,
  async (_req, res) => {    
    const status = 200;
    res.status(status).json(res.locals.objProductId);
  }
);

productsRouter.put('/:id',
  validationProductsBody,
  updateProductAndFindIdAndTreatError,
  async (_req, res) => {    
    const status = 200;
    res.status(status).json(res.locals.objProductId);
  }
);

productsRouter.delete('/:id',
  deleteProductAndFindIdAndTreatError,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.objProductId);
  }
);

module.exports = productsRouter;
