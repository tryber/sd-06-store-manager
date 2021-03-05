const { Router } = require('express');
const { salesValited } = require('../middleware/salesValidation');
const { idSalesValidate } = require('../middleware/idSalesValidation');
const { create, getSales, getSaleId, updateSate } = require('../services/salesService');
const { BodyValidated } = require('../middleware/bodySalesValidated');

const router = Router();

router.post('/', salesValited, create );

router.get('/', getSales );

router.get('/:id',idSalesValidate, getSaleId  );

router.put('/:id', BodyValidated, updateSate );

module.exports = router; 