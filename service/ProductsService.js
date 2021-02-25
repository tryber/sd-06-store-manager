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

const getByIdServices = async (id) => {
  const allProducts = await ProductsModel.getById(id);
  return allProducts;
};

module.exports = {
  getAllProductsServices,
  createProductService,
  getByIdServices,
};
