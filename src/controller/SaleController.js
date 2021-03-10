const { Router } = require('express');
const rescue = require('express-rescue');
const SaleService = require('../service/SaleService');
const {
  validateInvalidSaleId,
  validateSaleIdNotFound,
  validateLegalQuantity,
  validateProductQuantityForSale,
  validateSaleExistence
} = require('../middlewares/validations');
const errorMessages = require('../dictionary/errorMessages');
const codeMessages = require('../dictionary/codeMessages');
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
  validateSaleIdNotFound,
  rescue(async (request, response) => {
    const { id } = request.params;
    const foundSale = await SaleService.findSaleById(id);

    if (!foundSale) response.status(statusCodes.NOT_FOUND).json({
      err: {
        message: errorMessages.SALE_NOT_FOUND,
        code: codeMessages.NOT_FOUND,
      }
    });

    response.status(statusCodes.OK).json(foundSale);
  }));

SaleController.delete(
  '/:id',
  validateInvalidSaleId,
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
