const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const validateProducts = require('../services/validateProducts');

router.post('/products', validateProducts, controllers.createProduts);
router.get('/products', controllers.searchAllProduts);
router.get('/products/:id', controllers.searchOneProdut);

module.exports = router;
