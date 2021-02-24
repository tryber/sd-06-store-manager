const { ProductsModel } = require('../models');

const getAll = async () => await ProductsModel.getAll();
const getById = async (id) => await ProductsModel.getById(id);
const postProduct = async (product) => await ProductsModel.postProduct(product);
const putProduct = async (product) => await ProductsModel.putProduct(product);
const deleteProduct = async (id) => await ProductsModel.deleteProduct(id);

module.exports = {
  getAll,
  getById,
  putProduct,
  postProduct,
  deleteProduct,
};
