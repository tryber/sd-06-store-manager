const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const HTTP422 = 422;

const allSales = async () => {
  return await salesModel.allSales();
};

const addSales = async (newSales) => {
  return await salesModel.addSales(newSales);
};

const salesById = async (id) => {
  return await salesModel.salesById(id);
};

const updateSales = async (id, newSales) => {
  return await salesModel.updateSales(id, newSales);
};

const validateSales = async (request, response, next) => {
  const sales = request.body;
  sales.forEach((el) => {
    if (el.quantity < 1 || typeof el.quantity !== 'number') {
      return response.status(HTTP422)
        .json( { err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }});
    }
  });
  
  
  next();
};

const checkId = async (request, response, next) => {
  const id = request.params.id || null;
  if (!ObjectId.isValid(id)) return response.status(HTTP422).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',

    },
  });
  
  next();
};

module.exports = {
  addSales,
  validateSales,
  allSales,
  salesById,
  checkId,
  updateSales
};