const model = require('../Models/storeManagerBD');
const minCaractName = 5;
const zero = 0;

const quantityValid = (_name, quantity) => {
  if (!quantity || !Number.isInteger(quantity) || quantity === zero) return false;  
  return true;
};

const nameValid = (name, _quantity) => {
  if(typeof name !== 'string' || name.length < minCaractName) return false;
  return true;
};

const productRepeat = async (name) => {
  const getAllProducts = await model.getAllProducts();
  const notFound = getAllProducts.filter((product) => product.name === name);
  if(notFound.length > zero) return false;
  return true;
};

const create = async (name, quantity) => {
  const produto = await model.create(name, quantity);
  return produto;
};

const getAll = async () => {
  const products = await model.getAllProducts();
  return products;
};

module.exports = {
  quantityValid,
  nameValid,
  productRepeat,
  create,
  getAll
};
