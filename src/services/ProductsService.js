
const { ObjectId } = require('mongodb');
const Products = require('../models/Products');
const helpers = require('./helpers');

const getAll = async () => {
  return await Products.getAll();
};

const insertProduct = async (name, qnt) => {
  const minChar = 5;
  const nameIsError = await helpers.nameValidation(name, minChar);
  const qntIsError = helpers.quantityValidation(qnt);

  if (nameIsError) return nameIsError;
  if (qntIsError) return qntIsError;

  return await Products.insertProduct(name, qnt);
};

module.exports = {
  insertProduct,
  getAll
};
