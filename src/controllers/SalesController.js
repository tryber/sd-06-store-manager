const { Router } = require('express');
const SalesRouter = Router();
const rescue = require('express-rescue');

const bodyParser = require('body-parser');
SalesRouter.use(bodyParser.json());

const createSalesService = require('../services/CreateSaleService');
const getSalesByIdService = require('../services/GetSalesByIdService');
const getSalesService = require('../services/GetSalesService');
const updateSalesByIdService = require('../services/UpdateSalesByIdService');
const deleteSaleByIdService = require('../services/DeleteSaleByIdService');

const createSales = async (req, res) => {
  const arraySale = req.body;

  const resp = await createSalesService(arraySale);

  return res.status(resp[0]).json(resp[1]);
};

const getSaleById = async (req, res) => {
  const id = req.params.id;

  const resp = await getSalesByIdService(id);
  return res.status(resp[0]).json(resp[1]);
};

const getAllSales = async (req, res) => {

  const resp = await getSalesService();
  return res.status(resp[0]).json({ sales: resp[1] });
};

const updateSalesById = async (req, res) => {
  const id = req.params.id;
  const sales = req.body;

  const resp = await updateSalesByIdService(id, sales);
  return res.status(resp[0]).json(resp[1]);
};

const deleteSaleById = async (req, res) => {
  const id = req.params.id;
  const resp = await deleteSaleByIdService(id);

  return res.status(resp[0]).json(resp[1]);
};

SalesRouter.post('/', rescue(createSales));
SalesRouter.get('/', rescue(getAllSales));
SalesRouter.get('/:id', rescue(getSaleById));
SalesRouter.put('/:id', rescue(updateSalesById));
SalesRouter.delete('/:id', rescue(deleteSaleById));

module.exports = SalesRouter;
