const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');
const { throwThisError } = require('../utils');
const ZERO = 0;
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

const stockUpdate = async (req, res) => {
  const { sale, method } = req;
  const item = sale.itensSold[0];
 
  // sale.itensSold.forEach(async (item) => {
  const product = await ProductsModel.findById(item.productId);
  
  let newQuantity;

  if (method === 'POST') newQuantity = product.quantity - item.quantity;
  if (method === 'DELETE') newQuantity = product.quantity + item.quantity;
  
  const errorMsg = 'Such amount is not permitted to sell';
  
  if (newQuantity < ZERO) throwThisError(NOT_FOUND, errorMsg, 'stock_problem');
  await ProductsModel.updateProduct(item.productId, product.name, newQuantity);
  // });
 
  return res.status(SUCCESS).json(sale);
};

const insertSale = async (req, res, next) => {
  const products = req.body;
  
  const insertedId = await SalesModel.insertSale(products);
  const sale =  {
    _id: insertedId,
    itensSold: products
  };
  req.sale = sale;

  next();
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

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  let deletedSale;

  try {
    deletedSale = await SalesModel.findById(id);
    await SalesModel.deleteSale(id);
  } catch {
    throwThisError(UNPROCESSABLE_ENTITY, 'Wrong sale ID format');
  }
  req.sale = deletedSale;

  next();
};

module.exports = {
  validateFields,
  stockUpdate,
  insertSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};
