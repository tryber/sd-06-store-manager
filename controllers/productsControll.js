const { Router } = require('express');
const productsServices = require('../services/productsServices');
const productValidation = require('../middleware/productValidation');

const route = Router()

route.post('/',productValidation.productValidated, productsServices.create ) 

module.exports = route;