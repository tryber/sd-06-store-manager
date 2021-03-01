const { Router } = require('express');
const { salesService, salesValidation } = require('../services');

const router = Router();

router.post('/', salesValidation.validaQuantity, salesService.create);
router.get('/', salesService.getAll);
router.get('/:id', salesValidation.idValid, salesService.getForId);
router.put('/:id',salesValidation.validaQuantity, salesService.update);
router.delete('/:id', salesValidation.idExist ,salesService.deleteSale);


module.exports = router;
