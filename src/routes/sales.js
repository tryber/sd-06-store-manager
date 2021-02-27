const { Router } = require('express');

const SalesController = require('../controllers/SalesController');

const salesRouter = Router();

const salesController = new SalesController();

salesRouter.get('/', salesController.list);
salesRouter.post('/', salesController.create);

module.exports = salesRouter;
