const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const validateProducts = require('../services/validateProducts');

router.post('/products', validateProducts, controllers.createProduts);

module.exports = router;
