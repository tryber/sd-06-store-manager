const ProductsModel = require('../models/ProductsModel');
const { Router } = require('express');
const connection = require('../models/connection');

const ProductsRouter = Router();

const OK = 200, CREATED = 201, UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;
const MIN_CHARACTERS = 5;

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsModel.getByName(name);

  if (name.length < MIN_CHARACTERS) {
    const errorInfo = {
      message: '\"name\" length must be at least 5 characters long',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  if (product) {
    const errorInfo = {
      message: 'Product already exists',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  if (quantity <= ZERO) {
    const errorInfo = {
      message: '\"quantity\" must be larger than or equal to 1',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  if (typeof quantity !== 'number') {
    const errorInfo = {
      message: '\"quantity\" must be a number',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  const { _id } = await ProductsModel.create(name, quantity);
  return res.status(CREATED).json({ _id, name, quantity });
});

ProductsRouter.get('/', async (_req, res) => {
  const products = await ProductsModel.getAll();
  return res.status(OK).json({ products });
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getById(id);
  if (!product) {
    const errorInfo = {
      message: 'Wrong id format',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  return res.status(OK).json(product);
});

ProductsRouter.post('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  if (name.length < MIN_CHARACTERS) {
    const errorInfo = {
      message: '\"name\" length must be at least 5 characters long',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  if (quantity <= ZERO) {
    const errorInfo = {
      message: '\"quantity\" must be larger than or equal to 1',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  if (typeof quantity !== 'number') {
    const errorInfo = {
      message: '\"quantity\" must be a number',
      code: 'invalid_data',
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  await ProductsModel.update({ id, name, quantity });
  return res.status(OK).json({ id, name, quantity });
  
});

ProductsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsModel.getById(id);
  console.log(product);
  if (!product) {
    const errorInfo = {
      message: 'Wrong id format',
      code: 'invalid_data'
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  await ProductsModel.delById(product._id);
  return res.status(OK).json(product);
});

module.exports = ProductsRouter;
