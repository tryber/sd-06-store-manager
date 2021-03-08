const products = require('../models/products');

const createProduct = async (productName, productQuantity) => {
  const productExists = await products.getByName(productName);
  
  if (productExists) return 'duplicated';

  return products.insertProduct(productName, productQuantity);
};

const allProducts = async () => await products.getAll();

const productById = async (id) => await products.getById(id);

const updateProductInfo = async (id, name, quantity) => (
  await products.updateOne(id, name, quantity)
);

const deleteProductInfo = async (id) => await products.deleteOne(id);

module.exports = {
  createProduct,
  allProducts,
  productById,
  updateProductInfo,
  deleteProductInfo,
};