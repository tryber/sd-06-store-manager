const SalesModel = require('../models/SalesModel');
const { throwThisError } = require('../utils');
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const validateFields = async (req, res, next) => {
  const products = req.body;
  const ONE = 1;

  const notOK = products
    .some(product => (typeof product.quantity !== 'number' || product.quantity < ONE) );

  if (notOK) throwThisError(UNPROCESSABLE_ENTITY, 'Wrong product ID or invalid quantity');

  next();
};

const insertSale = async (req, res) => {
  const products = req.body;
  
  const insertedId = await SalesModel.insertSale(products);
  const sale =  {
    _id: insertedId,
    itensSold: products
  };
  return res.status(SUCCESS).json(sale);
};

const getAll = async (req, res) => {
  const sales = await SalesModel.getAll();
  
  return res.status(SUCCESS).json({ sales });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const throwNotFoundErr = () => throwThisError(NOT_FOUND, 'Sale not found', 'not_found');
  try {
    const sale = await SalesModel.findById(id);
    if (!sale) throwNotFoundErr();
    return res.status(SUCCESS).json({ sale });
  } catch {
    throwNotFoundErr();
  };
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const products = req.body;
  let sale;
  
  try {
    await SalesModel.updateSale(id, products);
    sale = await SalesModel.findById(id);
  } catch {
    throwThisError(UNPROCESSABLE_ENTITY, 'Wrong product ID or invalid quantity');
  }
  return res.status(SUCCESS).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  let deletedSale;

  try {
    deletedSale = await SalesModel.findById(id);
    await SalesModel.deleteSale(id);
  } catch {
    throwThisError(UNPROCESSABLE_ENTITY, 'Wrong sale ID format');
  }
  return res.status(SUCCESS).json(deletedSale);
};

module.exports = {
  validateFields,
  insertSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};
