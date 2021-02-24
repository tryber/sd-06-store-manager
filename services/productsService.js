const Products = require('../models/products');

const getAllProducts = async() => {
  return await Products.getAll();
};

const createNewProduct = async(name, quantity) => {
  const newProduct = await Products.createProduct(name, quantity);

  return newProduct;
};

const findProductById = async(id) => {
  return await Products.findById(id);
};

const updateProduct = async (id, name, quantity) => {
  return await Products.update(id, name, quantity);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  findProductById,
  updateProduct,
};
