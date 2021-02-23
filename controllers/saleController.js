const { Router } = require('express');
const sale = require('../models/sale');

const routerSale = new Router();
const SUCCESS = 200;

routersale.get('/', async (_req, res)=>{
  const sales = await sale.getAll();

  res.status(SUCCESS).json(sales);
});

module.exports = routerSale;
