const ProductsModel = require('../models/ProductsModel');

const getAllProductsServices = async () => {
  const allProducts = await ProductsModel.getAllProducts();
  return allProducts;
};

const createProductService = async (name, quantity) => {
  const { _id } = await ProductsModel.createProduct(name, quantity);
  return ({
    _id,
    name,
    quantity,
  });
};

module.exports = {
  getAllProductsServices,
  createProductService,
};
