const saleService = require('../services/saleService');
const rescue = require('express-rescue');
const { status, errors } = require('../utils/status');
const { response } = require('express');
const { throwError } = require('../utils/errorHandler');

const createSale = async (req, res) => {
  const { body } = req;

  const createdSale = await saleService.createSale(body);

  res.status(status.ok).json(createdSale);
};

const getAll = async (req, res) => {
  const responsePayload = await saleService.getAll();
  res.status(status.ok).json(responsePayload);
};

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const responsePayload = await saleService.getById(id);

  if (!responsePayload) throw new throwError(status.notFound, errors.saleNotFound);

  res.status(status.ok).json(responsePayload);
});

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const responsePayload = await saleService.updateSale(id, sale);
  res.status(status.ok).json(responsePayload);
};

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const responsePayload = await saleService.deleteSale(id);
  res.status(status.ok).json(responsePayload);
});

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
