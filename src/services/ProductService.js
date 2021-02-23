const Product = require('../models/ProductsModel');
const { validationCreate } = require('./Validations');

const createProduct = async (name, quantity) => {
  const validation = await validationCreate(name, quantity);
  console.log(validation);
  if(validation) return validation;
  return await Product.createProduct(name, quantity);
};

const getAllProducts = async () => {
  return await Product.getAllProducts();
};

module.exports = {
  createProduct,
  getAllProducts,
};

