const Sales = require('../models/SalesModel');
const { validationCreate, validationUpdate, validationId } = require('./Validations');

const createSale = async (productId, quantity) => {
  // const validation = await validationCreate(productId, quantity);
  // if(validation) return validation;
  return await Sales.createProduct(productId, quantity);
};

// const getAllProducts = async () => {
//   return await Product.getAllProducts();
// };

// const findByIdProduct = async (id) => {
//   const validation = validationId(id);
//   if(validation) return validation;
//   return await Product.findByIdProduct(id);
// };

// const updateByIdProduct = async (id, name, quantity) => {
//   const validation = await validationUpdate(name, quantity);
//   if(validation) return validation;
//   return await Product.updateByIdProduct(id, name, quantity);
// };

// const deleteByIdProduct = async (id) => {
//   const product = findByIdProduct(id);
//   await Product.deleteByIdProduct(id);
//   return product;
// };

module.exports = {
  createSale,
  // getAllProducts,
  // findByIdProduct,
  // updateByIdProduct,
  // deleteByIdProduct,
};

