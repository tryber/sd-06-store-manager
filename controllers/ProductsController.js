const { Router } = require('express');
const Products = require('../services/ProductsService');

const router = new Router();
const SUCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router
  .post('/', async (req, res) => {
    const { name, quantity } = req.body;

    const product = await Products.create(name, quantity);

    if (product.message) return res.status(UNPROCESSABLE_ENTITY).json(
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
    const product = await Products.findById(id);

    if (product.message) return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: product.message
      }
    });

    res.status(SUCESS).json(product);
  })
  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updatedProduct = await Products.update(id, name, quantity);

    if (updatedProduct.message) return res.status(UNPROCESSABLE_ENTITY).json(
      { err: {
        code: 'invalid_data',
        message: updatedProduct.message
      }}
    );

    res.status(SUCESS).json(updatedProduct);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Products.remove(id);

    if (deletedProduct.message) return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: deletedProduct.message
      }
    });

    res.status(SUCESS).json(deletedProduct);
  });


module.exports = router;