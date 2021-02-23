const { Router } = require('express');
const Products = require('../services/ProductsService');

const router = new Router();
const SUCESS = 200;
const CREATED = 201;
const INVALID_DATA = 422;

router
  .post('/', async (req, res) => {
    const { name, quantity } = req.body;

    const product = await Products.create(name, quantity);

    if (product.message) return res.status(INVALID_DATA).json(
      { err: {
        code: 'invalid_data',
        message: product.message
      }}
    );

    res.status(CREATED).json(product);
  })
  .get('/', async (req, res) => {
    const products = await Products.getAll();

    res.status(SUCESS).json({ products });
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const products = await Products.findById(id);

    res.status(SUCESS).json(products);
  });


module.exports = router;