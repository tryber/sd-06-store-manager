const { Router } = require('express');
const { salesValited } = require('../middleware/salesValidation');
const { create } = require('../services/salesService');

const router = Router();

router.post('/', salesValited, create );

module.exports = router; 