const ProductsModel = require('../models/ProductsModel');

const getAllProductsService = async () => {
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

const getByIdService = async (id) => {
  const product = await ProductsModel.getById(id);
  return product;
};

module.exports = {
  createProductService,
  getAllProductsService,
  getByIdService,
};
