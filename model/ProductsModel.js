const connection = require('./connection');

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findProductByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  createProduct,
  findProductByName
};
