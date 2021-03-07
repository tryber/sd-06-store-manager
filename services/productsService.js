const products = require('../models/products');

const createProduct = async (productName, productQuantity) => {
  const productExists = await products.getByName(productName);
  
  if (productExists) return 'duplicated';

  return products.insertProduct(productName, productQuantity);
};

const allProducts = async () => await products.getAll();

const productById = async (id) => await products.getById(id);

module.exports = {
  createProduct,
  allProducts,
  productById,
};