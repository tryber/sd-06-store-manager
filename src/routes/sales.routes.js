const { Router } = require('express');

const SalesController = require('../controllers/SalesController');
const salesDataValidator = require('../middlewares/validateSaleData');

const salesController = new SalesController();

const salesRoutes = Router();

salesRoutes.get('/', salesController.list);
salesRoutes.get('/:id', salesController.show);

salesRoutes.post('/', salesDataValidator, salesController.create);

salesRoutes.put('/:id', salesDataValidator, salesController.update);

salesRoutes.delete('/:id', salesController.delete);

module.exports = salesRoutes;
