const connection = require('./connection');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection().then((db) => 
    db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  createProduct,
  getAll
};
