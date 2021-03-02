const { Router } = require('express');
const SalesService = require('../services/SalesService');
const ProductService = require('../services/ProductsService');
const { verifyProductId } = require('../assets');
const SalesController = new Router();

const STATUS_200 = 200;

SalesController.post('/', async (request, response) => {
  const itensSale = request.body;
  const allProd = await ProductService.getProd();
  const productFound = verifyProductId(itensSale, allProd);
  const [ error ] = await SalesService.middlewareVerification(response, itensSale);
  if (error === null && productFound) {
    const addedItens = await SalesService.salesAdded({ itensSold: itensSale });
    return response.status(STATUS_200).json(addedItens);
  }
});

SalesController.get('/', async (_request, response) => {
  const allSales = await SalesService.getSales();
  return response.status(STATUS_200).json({ sales: allSales });
});

SalesController.get('/:id', async (request, response) => {
  const { id } = request.params;
  const allSales = await SalesService.getSales();
  const veriRes = await SalesService.middlewareVerificationGetId(response, id, allSales);
  if(veriRes === null) {
    const sale = await SalesService.getSaleById(id);
    return response.status(STATUS_200).json(sale);
  }
});

SalesController.put('/:id', async (request, response) => {
  const { id } = request.params;
  const [{ productId,  quantity }] = request.body;
  const [ checkError ] = await SalesService
    .middlewareVerification(response, [{ productId, quantity }]);
  if (checkError === null) {
    const saleUpdated = await SalesService.updateSaleId(id, quantity, productId);
    return response.status(STATUS_200).json(saleUpdated);
  }
});

module.exports = SalesController;
