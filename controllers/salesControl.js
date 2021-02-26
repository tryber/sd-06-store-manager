const { Router } = require('express');
const { salesService, salesValidation } = require('../services');

const router = Router();

router.post('/', salesValidation.validaQuantity, salesService.create);
router.get('/', salesService.getAll);
router.get('/:id', salesValidation.idValid, salesService.getForId);
 

module.exports = router;