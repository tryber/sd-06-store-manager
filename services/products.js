const products = require('../models/products');


const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || !Number.isInteger(quantity)) return false;

  return true;
};

const getAll = async () => {
  const products = await products.getAll();

  return products;
};

const findById = async (id) => {
  const product = await products.findById(id);

  if (!product) return null;

  return product;
};

const create = async (productName, quantity) => {
  const isProductValid = isValid(productName, quantity);

  if (!isProductValid) return false;

  const { insertedId } = await products.create({ name: productName, quantity });

  return {
    _id: insertedId,
    name: productName,
    quantity
  };
};

module.exports = {
  getAll,
  findById,
  create,
};