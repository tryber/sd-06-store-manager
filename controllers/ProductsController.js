const { Router } = require('express');
const ProductService = require('../services/ProductsService');
const { validateProduct } = require('../middlewares/ProductMiddlewares');

const ProductsControllerRouter = Router();

const Ok = 200;
const Created = 201;
const UnprocessableEntity = 422;

const invalidDataError = {err: {code: 'invalid_data',message: 'Wrong id format'}};
const errorMessage = {err: {code: 'invalid_data', message: 'Product already exists'} };


ProductsControllerRouter.get('/', async (_req, res) => {
  const products = await ProductService.getAll();

  res.status(Ok).json(products);
});

ProductsControllerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const products = await ProductService.findById(id);
  
  !products ?
    res.status(UnprocessableEntity).json(invalidDataError)
    :
    res.status(Ok).json(products);
});

ProductsControllerRouter.post('/', validateProduct, async (req, res) => {
  const { name, quantity } = req.body;

  const alreadyExists = await ProductService.findByName(name);
  if (alreadyExists) return res.status(UnprocessableEntity).json(errorMessage);

  const products = await ProductService.create(name, quantity);
  res.status(Created).json(products);
});

ProductsControllerRouter.put('/:id',validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const products = await ProductService.update(id, name, quantity);

  res.status(Ok).json(products);
});

ProductsControllerRouter.delete('/:id', async(req, res) => {
  const { id } = req.params;

  const products = await ProductService.remove(id);

  !products ? 
    res.status(UnprocessableEntity).json(invalidDataError)
    :
    res.status(Ok).json(products);
});

module.exports = ProductsControllerRouter;
