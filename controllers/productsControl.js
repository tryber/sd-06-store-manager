const { Router } = require('express');
const { productsHandlingDB } = require('../models');
const productsServices = require('../services');

const router = Router();
const SUCCESS = 200;
const Err = 422;

router.post('/',productsServices.validateBody, productsServices.create);
router.get('/', productsServices.getAll);
router.get('/:id', productsServices.getById);

module.exports = router;
