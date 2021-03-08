const { Router } = require('express');
const SalesServices = require('../services/SalesServices');

const router = new Router();

router.post('/', SalesServices.registerSale);

module.exports = router;

