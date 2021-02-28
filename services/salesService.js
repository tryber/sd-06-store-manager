const sales = require('../models/sales');
const { ObjectId } = require('mongodb');

const dataValidate = async (itensSold) => {
  const number0 = 0;

  let error = {};

  itensSold.forEach(item => {
    if (item.quantity <= number0 || !Number(item.quantity)) {
      error = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
          codeStatus: 422,
        }
      };
    }
  });

  return error;
};

const create = async (itensSold) => {
  const errorMessage = await dataValidate(itensSold);

  if (errorMessage.err) return errorMessage;

  const salesResult = await sales.create(itensSold);

  return salesResult;
};

const getAll = async () => {
  const result = sales.getAll();

  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  const result = await sales.getById(id);

  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return result;
};

const upDate = async (id, itensSold) => {
  const errorMessage = await dataValidate(itensSold);

  if (errorMessage.err) return errorMessage;

  const salesResult = await sales.upDate(id, itensSold);

  return salesResult;
};

module.exports = {
  create,
  getAll,
  getById,
  upDate,
};
