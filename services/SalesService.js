const {
  createSales,
  getAllSales,
  getByIdSales,
  updateSales,
  removeSales,
} = require('../models/SalesModel');
const { getByIdProducts, updateProducts } = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');

const ZERO = 0;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

const createValidation = async (itensSold) => {
  const validation = {};
  itensSold.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      validation.code = UNPROCESSABLE;
    }
  });
  if (validation.err) return validation;
  const newSale = await createSales(itensSold);
  return { code: 200, newSale };
};

const getAllValidation = async () => {
  const sales = await getAllSales();
  return { code: 200, sales };
};

const getByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      code: NOT_FOUND,
    };
  }
  const sale = await getByIdSales(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      code: NOT_FOUND,
    };
  }
};

const updateValidation = async (id, updated) => {
  const validation = {};
  updated.forEach((item) => {
    if (item.quantity <= ZERO) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      validation.code = 422;
    }
    if (isNaN(item.quantity)) {
      validation.err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      validation.code = 422;
    }
  });

  if (validation.err) return validation;
  await updateSales(id, updated);
  const updateSale = await getByIdSales(id);
  return { code: 200, updateSale };
};

const removeValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
      code: UNPROCESSABLE,
    };
  }
  const delSale = await getByIdSales(id);
  await removeSales(id);
  return { code: 200, delSale };
};

const setValidation = async (req, res, next) => {
  const [{ productId, quantity }] = req.body;
  const item = await getByIdProducts(productId);
  const newQuantity = (item.quantity - quantity);
  if (newQuantity < ZERO){
    return res.status(NOT_FOUND).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  }
  await updateProducts(item._id, item.name, newQuantity);

  next();
};

const stockValidation = async (req, res, next) => {
  const { id } = req.params;
  const sales = await getByIdSales(id);
  const { productId, quantity } = sales.itensSold['0'];
  const item = await getByIdProducts(productId);
  const newQuantity = (item.quantity + quantity);
  await updateProducts(item._id, item.name, newQuantity);

  next();
};


module.exports = {
  createValidation,
  getAllValidation,
  getByIdValidation,
  updateValidation,
  removeValidation,
  stockValidation,
  setValidation
};
