const products = require('../services/products');
const routes = require('express').Router();
const rescue = require('express-rescue');

const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;



routes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);

  if (!product) return res.status(NOT_FOUND).json({ message: 'Not found' });

  res.status(OK).json(product);
}));

routes.route('/')
  .get(rescue(async (req, res) => {
    const products = await products.getAll();

    res.status(OK).json(products);
  }))
  .post(rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await products.create(name, quantity);
    
    if (!createdProduct) return res.status(BAD_REQUEST)
      .json({ message: 'Unsubmittable data' });

    res.status(OK).json(createdProduct);
  }));

module.exports = routes;
