const products = require('../services/products');
const routes = require('express').Router();
const rescue = require('express-rescue');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;



routes.route('/:id')
  .get(rescue(async (req, res) => {
    const { id } = req.params;
    const searchedProduct = await products.findById(id);

    if (searchedProduct === null || searchedProduct.err)
      return res.status(UNPROCESSABLE_ENTITY).json(searchedProduct);

    res.status(OK).json(searchedProduct);
  }))
  .put(rescue(async (req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    const productToUpdate = await products.update(id, updateProduct);

    if (productToUpdate.err) return res.status(UNPROCESSABLE_ENTITY)
      .json(productToUpdate);

    res.status(OK).json(productToUpdate);
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
