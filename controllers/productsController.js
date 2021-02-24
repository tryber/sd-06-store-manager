const products = require('../services/products');
const routes = require('express').Router();
const rescue = require('express-rescue');


routes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);

  if (!product) return res.status(404).json({ message: 'Not found' });

  res.status(200).json(product);
}));

routes.route('/')
  .get(rescue(async (req, res) => {
    const products = await products.getAll();

    res.status(200).json(products);
  }))
  .post(rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await products.create(name, quantity);
    
    if (!createdProduct) return res.status(400).json({ message: 'Unsubmittable data' });

    res.status(200).json(createdProduct);
  }));

module.exports = routes;
