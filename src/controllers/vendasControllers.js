const express = require('express');
const rescue = require('express-rescue');
const connection = require('../models/connection');
const vendasRouter = express.Router();
const { createSale, findAllSales, findSaleById, removeSale }
  = require('../models/salesModel');
const { validingQuantity, validingSale } = require('../middlewares/validingSales');
 
/** abreviação de status */
const cadastrado = 201;
const tudoCerto = 200;
const nunVi = 422;

/** Cadastro das vendas */
vendasRouter.post('/', validingQuantity, rescue(async (req, res) => {
  const itensSold = req.body;
  const sales = await createSale(itensSold);
  return res.status(tudoCerto).send(sales[0]);
}));

/** listando todas as vendas */
vendasRouter.get('/', rescue(async (req, res) => {
  const sales = await findAllSales();
  return res.status(tudoCerto).json({ sales });
}));

/** listando venda por id */
vendasRouter.get('/:id', validingSale, rescue(async (req, res) => {
  const { id } = req.params;
  const result = await findSaleById(id);
  res.status(tudoCerto).json(result);
}));

/** apagando venda */
vendasRouter.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await findSaleById(id);
  await removeSale(id);
  return response.status(tudoCerto).json(sale);
}));

module.exports = vendasRouter;
