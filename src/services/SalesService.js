const { createSale, getAll, getById, update, exclude } = require('../models/SalesModel');
const { ObjectId } = require('mongodb');

const STATUS_NOTFOUND= 404;
const STATUS_UNPROCESSABLE= 422;
const ZERO = 0;

const createValidation = async (itens) => {
  const validation = {};
  itens.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };
      validation.code = 422;
    } 
  });
  if (validation.err) return validation;
  const create = await createSale(itens);
  return {code: 200, create};
};

const getAllValidation = async () => {
  const sales = await getAll();
  return {code: 200, sales};;
};

const getByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      code: 404
    };
  }
  const sale = await getById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      code: 404
    };
  }
};

const editValidation = async (id, updatedItens) => {
  const validation = {};
  updatedItens.forEach((item) => {
    if (item.quantity <= ZERO) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };
      validation.code = 422;
    }
    if (isNaN(item.quantity)) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };
      validation.code = 422;
    }
  });

  if (validation.err) return validation;
  await update(id, updatedItens);
  const updateSale = await getById(id);
  return { code: 200, updateSale };
};

const deleteValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      },
      code: 422
    };
  }
  const deletedSale = await getById(id);
  await exclude(id);
  return {code: 200, deletedSale};;
};

module.exports = {
  createValidation,
  getAllValidation,
  getByIdValidation,
  editValidation,
  deleteValidation
};
