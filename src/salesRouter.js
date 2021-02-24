const { Router } = require('express');
const SalesController = require('./controllers/SalesController');
const {validateRegisterSale} = require('./validations/validationMiddlewares');


const salesRouter = new Router();

salesRouter.post('/', validateRegisterSale, SalesController.registerSale);

salesRouter.get('/', SalesController.getAll);

salesRouter.get('/:id', SalesController.getById);

salesRouter.put('/:id', validateRegisterSale, SalesController.updateSale);

salesRouter.delete('/:id', SalesController.deleteSale);




module.exports = salesRouter;