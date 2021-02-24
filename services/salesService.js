const { request } = require('express');
const { ObjectId } = require('mongodb');

const model = require('../models/salesModel');

const validId = (id) => ObjectId.isValid(id);

const validations = (bodyOrAnId, requestType) => {

  if (requestType === 'delete') {

    const sale = getASaleById(bodyOrAnId);

    saleNotFoundValidation(sale);

    return sale;
  }

  bodyOrAnId.forEach(({ productId, quantity }) => {
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
  
  validations(body);

  const createdSale = await model.createASale(body);

  return createdSale;
};

const updateASale = async (id, body) => {

  const saleThatShouldBeUpdated = await model.getASaleById(id);

  saleNotFoundValidation(saleThatShouldBeUpdated);

  validations(body);

  const updatedSale = await model.updateASale(id, body);

  return updatedSale; 
};

const removeASale = async (id) => {

  const isValid = validId(id);
  
  if (!isValid) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }

  const saleThatShouldBeRemoved = await model.getASaleById(id);

  validations(id, 'delete');

  await model.removeASale(id);

  return saleThatShouldBeRemoved;
};

module.exports = {
  getAllSales,
  getASaleById,
  createASale,
  updateASale,
  removeASale
};
