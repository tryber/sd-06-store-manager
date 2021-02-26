const { Router } = require('express');
const Rescue = require('express-rescue');
const {
  getById,
  updateProduct,
  deleteProduct,
  getAll,
  insertProduct,
} = require('../controllers/productsController');
const productsRouter = Router();

productsRouter.get('/:id', Rescue(getById));
productsRouter.put('/:id', Rescue(updateProduct));
productsRouter.delete('/:id', Rescue(deleteProduct));
productsRouter.get('/', Rescue(getAll));
productsRouter.post('/', Rescue(insertProduct));

module.exports = productsRouter;