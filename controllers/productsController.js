const { Router } = require('express');
const rescue = require('express-rescue');
const Products = require('../services/productsServices');

const ProductsRouter = Router();

const OK = 200;
const CREATED = 201;
// const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

// GET'S

ProductsRouter.get('/', rescue(async (req, res) => {
  try {
    const data = await Products.getAll();
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE).json({ message: err.message });
  }
}));

ProductsRouter.get('/:id', rescue(async (req, res) => {
  try {
    const data = await Products.getById(req.params.id);
    res.status(OK).send(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
}));

// POST

ProductsRouter.post('/', rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const data = await Products.create(name, quantity);
    res.status(CREATED).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
}));

// UPDATE

ProductsRouter.put('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await Products.update(id, name, quantity);
    res.status(OK).json(data);
  } catch(err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
}));

// DELETE

ProductsRouter.delete('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.getById(id);
    await Products.remove(id);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
  
}));

module.exports = ProductsRouter;