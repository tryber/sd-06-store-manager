const { StoreManagerModel } = require('../models');

const getAll = async () => await StoreManagerModel.getAll();
const getById = async (id) => await StoreManagerModel.getById(id);

const postProduct = async (product) => {
  return await StoreManagerModel.postProduct(product);
};

module.exports = {
  getAll,
  getById,
  postProduct,
};
