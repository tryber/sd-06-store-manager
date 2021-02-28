const { Router } = require('express');
const SaleController = require('../controllers/SaleController');
const { validateCreateSale } = require('../utils/validationErrors');

const saleRouter = new Router();

saleRouter.post('/', validateCreateSale, SaleController.createSale);

// saleRouter.get('/', SaleController.getAllSales);

// saleRouter.get('/:id', SaleController.getSaleById);

// saleRouter.put('/:id', validateCreateSale, SaleController.updateSale);

// saleRouter.delete('/:id', SaleController.deleteSale);

module.exports = saleRouter;
