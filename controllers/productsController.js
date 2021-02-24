const products = require('../services/products');
const routes = require('express').Router();
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;



routes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);

  if (!product) return res.status(NOT_FOUND).json({ message: 'Not found' });

  res.status(OK).json(product);
}));

routes.route('/')
  .get(rescue(async (_req, res) => {
    const productsArray = await products.getAll();

    res.status(OK).json({ products: productsArray });
  }))
  .post(rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await products.create(name, quantity);
    
    if (createdProduct.err) return res.status(UNPROCESSABLE_ENTITY)
      .json(createdProduct);

    res.status(CREATED).json(createdProduct);
  }));

module.exports = routes;
