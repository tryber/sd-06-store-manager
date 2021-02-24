const { ObjectId } = require('mongodb');
const productsRouter = require('../controllers/productsController');
const Products = require('../models/Products');
const helpers = require('./helpers');

const getAll = async () => {
  const result = await Products.getAll();
  const joinResult = { products: result };

  return joinResult;
};

const findById = async (id) => {
  const checkId = await helpers.idValidation(id);
  return(checkId);
};

const insertProduct = async (name, qnt) => {
  const minChar = 5;
  const nameIsError = await helpers.nameValidation(name, minChar);
  const qntIsError = helpers.quantityValidation(qnt);

  if (nameIsError) return nameIsError;
  if (qntIsError) return qntIsError;

  return await Products.insertProduct(name, qnt);
};

const updateProduct = async (id, name, qnt) => {
  const minChar = 5;
  const nameIsError = await helpers.nameValidation(name, minChar, true);
  const qntIsError = helpers.quantityValidation(qnt);

  if (nameIsError) return nameIsError;
  if (qntIsError) return qntIsError;

  const checkId = await helpers.idValidation(id);
  if (checkId && checkId.payload) return(checkId);

  await Products.updateProduct(id, name, qnt);
  const result = await Products.findById(id);
  return result;
};

const deleteProduct = async (id) => {
  const checkId = await helpers.idValidation(id);

  if (!checkId.payload) {
    await Products.deleteProduct(id);
  }

  return(checkId);
};

module.exports = {
  insertProduct,
  getAll,
  findById,
  updateProduct,
  deleteProduct
};
