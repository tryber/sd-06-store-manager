const { Router } = require('express');
const Rescue = require('express-rescue');
const {
  getById,
  updateSale,
  deleteSale,
  insertSale,
  getAllSales,
} = require('../controllers/salesController');
const salesRouter = Router();

salesRouter.get('/:id', Rescue(getById));
salesRouter.put('/:id', Rescue(updateSale));
salesRouter.delete('/:id', Rescue(deleteSale));
salesRouter.post('/', Rescue(insertSale));
salesRouter.get('/', Rescue(getAllSales));

module.exports = salesRouter;
