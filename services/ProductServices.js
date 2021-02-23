const { StoreManagerModel } = require('../models');

const getAll = async () => await StoreManagerModel.getAll();

const postProduct = async (product) => {
  return await StoreManagerModel.postProduct(product);
};

module.exports = {
  getAll,
  postProduct,
};
