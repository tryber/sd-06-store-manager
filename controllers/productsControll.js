const { Router } = require('express');
const productsServices = require('../services/productsServices');
const {productValidated} = require('../middleware/productValidation');
const {idValidate} = require('../middleware/idValidation');

const route = Router();

route.post('/', productValidated, productsServices.createProduct );

route.get('/', productsServices.allProducts ); 

route.get('/:id', idValidate , productsServices.idProduct ); 

route.put('/:id', productValidated , productsServices.updateProduct );

route.delete('/:id',idValidate,productsServices.deleteProduct);


module.exports = route;