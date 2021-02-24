const { Router } = require('express');
const middServices = require('../services');

const router = Router();
const SUCCESS = 200;
const Err = 422;

router.post('/',middServices.validateBody, middServices.create);

module.exports = router;
