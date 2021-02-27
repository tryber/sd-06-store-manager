const { Router } = require('express');

const SalesController = require('../controllers/SalesController');

const validateSale = require('../middlewares/validateSale');

const salesRouter = Router();

const salesController = new SalesController();

salesRouter.get('/', salesController.list);
salesRouter.get('/:id', salesController.show);
salesRouter.post('/', validateSale, salesController.create);
salesRouter.put('/:id', validateSale, salesController.update);

module.exports = salesRouter;
