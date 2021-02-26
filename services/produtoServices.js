const produtoController = require('../controller/produtoController');
const produtoModel = require('../model/produtoModel'); //importa as funçoes

const getAllProduct = () => produtoModel.getAll();

const getListId = async (id) => {
  const returnGetID = await produtoModel.getId(id);
  return returnGetID;
};

const putEditListId = async (id, name, quantity) => {
  const returnPutEditId = await produtoModel.putId(id, name, quantity);
  console.log('service', returnPutEditId);
  return returnPutEditId;
};

const createProduct = async (name, quantity) => {
  const newProduct = await produtoModel.create(name, quantity);
  return newProduct;
};

const deleteOneProduct = async (id) => {
  const deletedProduct = await produtoModel.deleteProduct(id);
  return deletedProduct;
};

const findNameProductExist = async (name) => {
  const nameExist = await produtoModel.findNameExist(name);
  return nameExist;
};

module.exports = {
  getAllProduct,
  createProduct,
  deleteOneProduct,
  getListId,
  putEditListId,
  findNameProductExist,
};
