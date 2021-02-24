const Product = require('../models/ProductsModel');
const { validationCreate, validationUpdate, validationId } = require('./Validations');

const createProduct = async (name, quantity) => {
  const validation = await validationCreate(name, quantity);
  if(validation) return validation;
  return await Product.createProduct(name, quantity);
};

const getAllProducts = async () => {
  return await Product.getAllProducts();
};

const findByIdProduct = async (id) => {
  const validation = validationId(id);
  if(validation) return validation;
  return await Product.findByIdProduct(id);
};

const updateByIdProduct = async (id, name, quantity) => {
  const validation = await validationUpdate(name, quantity);
  if(validation) return validation;
  return await Product.updateByIdProduct(id, name, quantity);
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProduct,
  updateByIdProduct,
};

