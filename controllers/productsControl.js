const { Router } = require('express');
const { productsServices, productsValidation } = require('../services');

const router = Router();

router.post('/',productsValidation.validateBody, productsServices.create);
router.get('/', productsServices.getAll);
router.get('/:id',productsValidation.idValid, productsServices.getById);
router.put('/:id',productsValidation.validateBody, productsServices.update);
router.delete('/:id',productsValidation.idValid,productsServices.deleteProduct);

module.exports = router;
