const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (product) => {
  const { name, quantity } = product;

  return await connection().then((db) => db
    .collection('products')
    .insertOne({ name, quantity }));
};

const findProductByName = async (name) => {
  return await connection().then((db) => db
    .collection('products')
    .find({ name })
    .toArray());
};

module.exports = {
  createProduct,
  findProductByName,
};
