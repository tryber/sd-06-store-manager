const { Router } = require('express');
const salesModules = require('../modules/salesModules');
const { ObjectId } = require('mongodb');
const { validateSales } = require('../services/salesServices');

const salesRouter = new Router();

const SUCESS = 200;
const createSucess = 201;

salesRouter.post('/', validateSales, async (req, res) =>  {
  const sale = await salesModules.createSale(req.body);
  res.status(createSucess).json(sale);
});

salesRouter.get('/', async (req, res) => {
  const allSales = await salesModules.getAllSales();
  res.status(SUCESS).json({ sales: allSales });
});

module.exports = { salesRouter };