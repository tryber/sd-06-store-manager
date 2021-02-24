const { StoreManagerModel } = require('../models');

const getAll = async () => await StoreManagerModel.getAll();
const getById = async (id) => await StoreManagerModel.getById(id);
const postProduct = async (product) => await StoreManagerModel.postProduct(product);
const putProduct = async (product) => await StoreManagerModel.putProduct(product);
const deleteProduct = async (id) => await StoreManagerModel.deleteProduct(id);

module.exports = {
  getAll,
  getById,
  putProduct,
  postProduct,
  deleteProduct,
};
