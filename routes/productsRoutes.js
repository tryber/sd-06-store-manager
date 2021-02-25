const { Router } = require('express');

const productsRoutes = Router();
const productsController = require('../controllers/productsController');

productsRoutes.get('/', productsController.getAll);
productsRoutes.get('/:id', productsController.findById);
productsRoutes.post('/', productsController.create);
productsRoutes.put('/:id', productsController.update);
productsRoutes.delete('/:id', productsController.remove);

module.exports = productsRoutes;
