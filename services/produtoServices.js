const produtoController = require('../controller/produtoController');
const produtoModel = require('../model/produtoModel'); //importa as funçoes

const getAllProduct = () => produtoModel.getAll();

const getListId = async (id) => {
  const returnGetID = await produtoModel.getId(id);
  return returnGetID;
};

const createProduct = async (name, quantity) => {
  const newProduct = await produtoModel.create(name, quantity);
  return newProduct;
};

const findNameProductExist = async (name) => {
  const nameExist = await produtoModel.findNameExist(name);
  return nameExist;
};

module.exports = {
  getAllProduct,
  createProduct,
  getListId,
  findNameProductExist,
};
