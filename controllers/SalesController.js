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
  const error = await SalesService.middlewareVerification(response, itensSale);

  if (error === null && productFound) {
    const addedItens = await SalesService.salesAdded({ itensSold: itensSale });
    return response.status(STATUS_200).json(addedItens);
  }  
});

module.exports = SalesController;
