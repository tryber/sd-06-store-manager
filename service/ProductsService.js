const ProductsModel = require('../models/ProductsModel');

const getAllProductsServices = async () => {
  const allProducts = await ProductsModel.getAllProducts();
  return allProducts;
};

const createProductService = async (name, quantity) => {
  const { _id } = await ProductsModel.createProduct(name, quantity);
  return ({
    id:  _id,
    name,
    quantity,
  });
};

const getIdProduct = async (id) => {
  const productById = await ProductsModel.getById(id);
  return productById;
};

module.exports = {
  getAllProductsServices,
  createProductService,
  getIdProduct,
};
