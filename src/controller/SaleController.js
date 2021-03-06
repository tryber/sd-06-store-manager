const { Router } = require('express');
const rescue = require('express-rescue');
const SaleService = require('../service/SaleService');
const ProductService = require('../service/ProductService');
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

    itensSold.forEach(async item => {
      const { productId } = item;
      const productToCompareQuantity = await ProductService.findProductById(productId);

      if (productToCompareQuantity.quantity < item.quantity) return response.status(404).json({
        err: {
          code: "stock_problem",
          message: "Such amount is not permitted to sell"
        }
      })
    }

    );


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
  validateItensSoldQuantity,
  rescue(async (request, response) => {
    const { id } = request.params;
    const saleToBeUpdated = request.body;

    await SaleService.updateProductInSale(id, saleToBeUpdated);
    const updatedSale = await SaleService.findSaleById(id);

    return response.status(statusCodes.OK).json(updatedSale);
  }));

module.exports = SaleController;
