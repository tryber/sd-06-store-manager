const connection = require('../database/connection');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => {
      return products;
    });
};

const registerProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((result) => result);
};

module.exports = {
  getAll,
  registerProduct,
};


