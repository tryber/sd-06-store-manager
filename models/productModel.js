const connection = require('./connection');

const createProduct = async (product) => connection()
  .then((db) => db.collection('products').insertOne(product));

const getAllProduct = async () => connection()
  .then((db) => db.collection('products').find().toArray());

module.exports = {
  createProduct,
  getAllProduct,
};
