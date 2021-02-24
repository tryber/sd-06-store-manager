// aqui organizar os endpoints relativos aos produtos
// realizar todo tratamento das requisições
// CRUD com GET, GET :id, POST, PUT :id, DELETE :id
const express = require('express');

// usando  o routes;
const routes = express.Router();

// importando as queries do Model
const Products = require('../models/Products') ;

// No MAGIC NUMBERS
const SUCCESS = 200;


// como explicado na thread de 24/02/2021
// [https://trybecourse.slack.com/archives/C016CCMKN9E/p1614104536091400?thread_ts=1614103977.091000&cid=C016CCMKN9E]

routes.get('/', async (_request, response) => {
  const allProductsList = await Products.getAll();

  return response.status(SUCCESS).send(allProductsList);
});


module.exports = routes;
