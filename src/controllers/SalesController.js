const ProductsServices = require('../services/SalesServices');
const rescue = require('express-rescue');
const {status, errorMessages} = require('../errorHandler/utils/status');
const { response } = require('express');
const { throwError } = require('../errorHandler/errorHandler');


const registerSale = async (req, res) => {
  const { body } = req;

  const responsePayload = await ProductsServices.registerSale(body);

  res.status(status.ok).json(responsePayload);
};

const getAll = async (req, res) => {
  const responsePayload = await ProductsServices.getAll();
  res.status(status.ok).json(responsePayload);
};

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const responsePayload = await ProductsServices.getById(id);

  if(!responsePayload) throw new throwError(status.notFound, errorMessages.saleNotFound);

  res.status(status.ok).json(responsePayload);
});

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const responsePayload = await ProductsServices.updateSale(id, sale);
  res.status(status.ok).json(responsePayload);
};

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const responsePayload = await ProductsServices.deleteSale(id);
  res.status(status.ok).json(responsePayload);
});


module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};