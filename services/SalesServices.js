const salesModels = require('../models/SalesModels');
const { ObjectId } = require('mongodb');

const NOTFOUND = 404;
const unprocessableEntity = 422;

const getAllSales = async () => {
  return await salesModels.getAllSales();
};

const registerSale = async (saleInfo) => {
  return await salesModels.registerSale(saleInfo);
};

const getSaleById = async (id) => {
  return await salesModels.getSaleById(id);
};

const validateSale = async (request, response, next) => {
  const sale = request.body;
  sale.forEach((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      return response.status(unprocessableEntity)
        .json( { err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }});
    }
  });

  next();
};

const validateId = (request, response, next) => {
  const id = request.params.id;
  if (!ObjectId.isValid(id)) return response.status(NOTFOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });

  next();
};

module.exports = {
  getAllSales,
  validateId,
  registerSale,
  validateSale,
  getSaleById,
};
