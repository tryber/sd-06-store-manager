const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const validateProducts = require('../services/validateProducts');
const validateSales = require('../services/validateSales');

router.post('/products', validateProducts, controllers.createProduts);
router.get('/products', controllers.searchAllProduts);
router.get('/products/:id', controllers.searchOneProdut);
router.put('/products/:id', validateProducts, controllers.updateProdut);
router.delete('/products/:id', controllers.deleteProdut);

router.post('/sales', validateSales, controllers.createSales);
router.get('/sales', controllers.searchAllSales);
router.get('/sales/:id', controllers.SearchSaleById);
router.put('/sales/:id', validateSales, controllers.updateSaleById);

module.exports = router;
