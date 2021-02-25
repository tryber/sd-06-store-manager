const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const productsRouter = Router();
const SUCCESS = 200;
const SUCCESS201 = 201;

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const searchResult = await ProductsService.findById(id);

  if (searchResult && searchResult.payload) {
    const { payload: { err }, error } = searchResult;

    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).json(searchResult);
});

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const searchResult = await ProductsService.updateProduct(id, name, quantity);

  if (searchResult && searchResult.payload) {
    const { payload: { err }, error } = searchResult; 

    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).json(searchResult);
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteResult = await ProductsService.deleteProduct(id);

  if (deleteResult && deleteResult.payload) {
    const { payload: { err }, error } = deleteResult;

    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).json(deleteResult);
});

productsRouter.get('/', async (_req, res) => {
  const result = await ProductsService.getAll();

  return res.status(SUCCESS).json(result);
});

productsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const searchResult = await ProductsService.insertProduct(name, quantity);

  if (searchResult && searchResult.payload) {
    const { payload: { err }, error } = searchResult;

    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS201).json(searchResult);
});

module.exports = productsRouter;
