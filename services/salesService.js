const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const HTTP422 = 422;

const addSales = async (newSales) => {
  return await salesModel.addSales(newSales);
};

const allSales = async () => {
  return await salesModel.allSales();
};

const salesById = async (id) => {
  return await salesModel.SalesById(id);
};

const updateSales = async (id, name, quantity) => {
  return await salesModel.updateSales(id, name, quantity);
};

const deleteSales = async (id) => {
  return await salesModel.deleteSales(id);
};
  

const checkId = async (request, response, next) => {
  const id = request.params.id || null;
  if (!ObjectId.isValid(id)) return response.status(HTTP422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
  
  next();
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

module.exports = {
  addSales,
  validateSales,
  allSales,
  salesById,
  checkId,
  updateSales,
  deleteSales
};