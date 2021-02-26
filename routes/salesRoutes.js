const { Router } = require('express');

const salesRoutes = Router();
const salesController = require('../controllers/salesController');

salesRoutes.get('/', salesController.getAll);
salesRoutes.get('/:id', salesController.findById);
salesRoutes.post('/', salesController.create);
salesRoutes.put('/:id', salesController.update);
salesRoutes.delete('/:id', salesController.remove);

module.exports = salesRoutes;