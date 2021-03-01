const { Router } = require('express');
const rescue = require('express-rescue');
const SaleService = require('../service/SaleService');
const {
  validateItensSoldQuantity,
  validateSaleExistence
} = require('../middlewares/validations');
const statusCodes = require('../dictionary/statusCodes');

const SaleController = new Router();

SaleController.post(
  '/',
  validateItensSoldQuantity,
  rescue(async (request, response) => {
    const itensSold = request.body;
    const sale = { itensSold };
    const { ops: createSale } = await SaleService.createSale(sale);

    response.status(statusCodes.OK).json(createSale[0]);
  }));

SaleController.get('/', rescue(async (_request, response) => {
  const sales = await SaleService.findAllSales();

  response.status(statusCodes.OK).json({ sales });
}));

SaleController.get(
  '/:id',
  validateSaleExistence,
  rescue(async (request, response) => {
    const { id } = request.params;
    const foundSale = await SaleService.findSaleById(id);

    response.status(statusCodes.OK).json(foundSale);
  }));

module.exports = SaleController;