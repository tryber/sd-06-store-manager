const { create, getAll, getById, update, exclude } = require('../models/SalesModel');
const { ObjectId } = require('mongodb');

const STATUS_NOTFOUND= 404;
const STATUS_UNPROCESSABLE= 422;
const ZERO = 0;

const createValidation = async (itens) => {
  itens.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      return res.status(STATUS_UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }  
  });
  
  return await create(itens);
};

const getAllValidation = async () => {
  await getAll();
};

const getByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_NOTFOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }});
  }
  const sale = await getById(id);
  if (!sale) {
    return res.status(STATUS_NOTFOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }});
  }
};

const editValidation = async (id, updatedItens) => {
  updatedItens.forEach((item) => {
    if (item.quantity <= ZERO) {
      return res.status(STATUS_UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
    if (isNaN(item.quantity)) {
      return res.status(STATUS_UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  await update(id, updatedItens);
  return await getById(id);
};

const deleteValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format'
        }});
  }
  const deletedSale = await getById(id);
  await exclude(id);
  return deletedSale;
};

module.exports = {
  createValidation,
  getAllValidation,
  getByIdValidation,
  editValidation,
  deleteValidation
};
