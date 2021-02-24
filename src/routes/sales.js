const { Router } = require('express');

const SalesController = require('../controllers/SalesController');

const salesRouter = Router();

const salesController = new SalesController();

salesRouter.get('/', salesController.list);

module.exports = salesRouter;
