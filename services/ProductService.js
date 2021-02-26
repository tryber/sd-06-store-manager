const ProductsModel = require('../models/ProductsModel');
const { throwThisError } = require('../utils');
const ZERO = 0;
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;

const validateFields = async (req, res, next) => {
  const product = req.body;
  const MIN_CHARS = 5;
  const ONE = 1;

  switch (true) {

  case (product.name.length < MIN_CHARS):
    throwThisError(
      UNPROCESSABLE_ENTITY, '"name" length must be at least 5 characters long'
    );

  case (typeof product.quantity !== 'number'):
    throwThisError(UNPROCESSABLE_ENTITY, '"quantity" must be a number');

  case (product.quantity < ONE):
    throwThisError(UNPROCESSABLE_ENTITY, '"quantity" must be larger than or equal to 1' );

  case (typeof product.name !== undefined):
    const nameExists = await ProductsModel.findByName(product.name);
    if (nameExists) throwThisError(UNPROCESSABLE_ENTITY, 'Product already exists');
    
  default:
    next();
  }
};

const insertProduct = async (req, res) => {
  const product = req.body;

  const newId = await ProductsModel.insertProduct(product);
  const { name, quantity } = product;
  const responseMessage = {
    _id: newId,
    name,
    quantity,
  };
  return res.status(CREATED).json(responseMessage);
};

const getAll = async (req, res) => {
  const all = await ProductsModel.getAll();
  return res.status(SUCCESS).json({ products: all });
};

const findById = async (req, res) => {
  const { id } = req.params;  

  try {
    const result = await ProductsModel.findById(id);
    if (!result) throwThisError(UNPROCESSABLE_ENTITY, 'Wrong id format');
    return res.status(SUCCESS).json(result);
  } catch {
    throwThisError(UNPROCESSABLE_ENTITY, 'Wrong id format');
  };
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
 
  const modifiedCount = await ProductsModel.updateProduct(id, name, quantity);
  if (modifiedCount === ZERO) throwThisError(UNPROCESSABLE_ENTITY, 'No changes');
  return res.status(SUCCESS).json({ _id: id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  let product;

  try {
    product = await ProductsModel.findById(id);
    await ProductsModel.deleteProduct(id);
  } catch {
    throwThisError(UNPROCESSABLE_ENTITY, 'Wrong id format');
  }
  return res.status(SUCCESS).json(product);
};

module.exports = {
  insertProduct,
  validateFields,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};
