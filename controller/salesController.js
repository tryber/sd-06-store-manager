const { Router } = require('express');
const salesServices = require('../services/salesServices');
const { verifySales, validateIdSales } = require('../services/middleware/verifyValidate');

const salesController = new Router();
const statusNumberSucess = 201;
const statusSucess = 200;
const statusNumberError = 422;
const statusError = 404;

salesController.get('/:id', validateIdSales, async (request, response) => {
  const { id } = request.params;
  const returnIdSales = await salesServices.getListSalesId(id);
  if (!returnIdSales)
    return response
      .status(statusError)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  return response.status(statusSucess).json(returnIdSales);
});

salesController.get('/', async (_request, response) => {
  const returnAllSales = await salesServices.getAllSales();
  return response.status(statusSucess).json(returnAllSales);
});

salesController.delete('/:id', validateIdSales, async(request, response) => {
  const  { id }  = request.params;
  const  itensSold  = request.body;
  const salesDel = {
    _id: id,
    itensSold,
  };
  salesDeleted = await salesServices.deleteOneSales (id, itensSold);
  if (!id)
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  return response.status(statusSucess).json(salesDel);
});

salesController.put('/:id', validateIdSales, async(request, response) => {
  const { id } = request.params;
  const  itensSold  = request.body;
  const salesEdit = {
    _id: id,
    itensSold,
  };
  const returnEditListIdSales = await salesServices.putEditListIdSales(id, itensSold);
  return response.status(statusSucess).json(salesEdit);
});

salesController.post('/', verifySales, async (request, response) => {
  const  itensSold = request.body;
  const createSales = await salesServices.registerSales(itensSold);
  console.log(itensSold, 'newSale');
  return response.status(statusSucess).json(createSales);
});

module.exports = salesController;
