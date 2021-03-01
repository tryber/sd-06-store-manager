const { Router } = require('express');
const rescue = require('express-rescue');
const SaleService = require('../service/SaleService');
const {
  validateItensSoldQuantity
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

module.exports = SaleController;