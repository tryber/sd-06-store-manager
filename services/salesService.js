const { ObjectId } = require('mongodb');

const model = require('../models/salesModel');

const validations = (body) => {
  body.forEach(({ productId, quantity }) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
    
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        }
      };
    }
  });
};

const saleNotFoundValidation = (sale) => {
  if (!sale) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
};

const getAllSales = async () => {
  return await model.getAllSales();
};

const getASaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }

  const sale = await model.getASaleById(id);

  saleNotFoundValidation(sale);

  return sale;
};

const createASale = async (body) => {
  
  const createdSale = await model.createASale(body);

  validations(body);
   
  return createdSale;
};

const updateASale = async (id, body) => {

  const updatedSale = await model.updateASale(id, body);
  
  validations(body);

  return updatedSale; 
};

const removeASale = async (id) => {
  const removedSale = await model.removeASale(id);

  saleNotFoundValidation(removedSale);

  return removedSale;
};

module.exports = {
  getAllSales,
  getASaleById,
  createASale,
  updateASale,
  removeASale
};
