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
const deuRuin = 404;
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
vendasRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const result = await findSaleById(id);
  if (!result) return res.status(deuRuin).json({
    err: {
      'code': 'not_found',
      'message': 'Sale not found'
    }
  });
  return res.status(tudoCerto).json(result);
}));

/** apagando venda */
vendasRouter.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await findSaleById(id);
  if (!sale) return res.status(nunVi).json({
    err: {
      'code': 'invalid_data',
      'message': 'Wrong sale ID format'
    }
  });
  await removeSale(id);
  return res.status(tudoCerto).json(sale);
}));

module.exports = vendasRouter;
