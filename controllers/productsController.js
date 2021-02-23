const { Router } = require('express');

const Products = require('../services/productsServices');

const ProductsRouter = Router();

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

// GET'S

ProductsRouter.get('/', async (req, res) => {
  try {
    const data = await Products.getAll();
    res.status(OK).json(data);
  } catch (err) {
    res.status(NOT_FOUND).json({ message: err.message });
  }
});

ProductsRouter.get('/:id', async (req, res) => {
  try {
    const data = await Products.getById(req.params.id);
    res.status(OK).send(data);
  } catch (err) {
    res.status(NOT_FOUND)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
});

// POST

ProductsRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const data = await Products.create(name, quantity);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
});

// UPDATE

ProductsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await Products.update(id, name, quantity);
    res.status(OK).json(data);
  } catch(err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
});

// DELETE

ProductsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.getById(id);
    await Products.remove(id);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
  
});

module.exports = ProductsRouter;