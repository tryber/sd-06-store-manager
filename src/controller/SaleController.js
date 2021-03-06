const { Router } = require('express');
const rescue = require('express-rescue');
const SaleService = require('../service/SaleService');
const {
  validateLegalQuantity,
  validateProductQuantityForSale,
  validateSaleExistence
} = require('../middlewares/validations');
const statusCodes = require('../dictionary/statusCodes');

const SaleController = new Router();

SaleController.post(
  '/',
  validateLegalQuantity,
  validateProductQuantityForSale,
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

SaleController.delete(
  '/:id',
  validateSaleExistence,
  rescue(async (request, response) => {
    const { id } = request.params;
    const recoveredSale = await SaleService.findSaleById(id);

    await SaleService.removeSale(id);

    return response.status(statusCodes.OK).json(recoveredSale);
  }));

SaleController.put(
  '/:id',
  validateLegalQuantity,
  rescue(async (request, response) => {
    const { id } = request.params;
    const saleToBeUpdated = request.body;

    await SaleService.updateProductInSale(id, saleToBeUpdated);
    const updatedSale = await SaleService.findSaleById(id);

    return response.status(statusCodes.OK).json(updatedSale);
  }));

module.exports = SaleController;
