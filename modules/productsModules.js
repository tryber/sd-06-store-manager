const connection = require('./connection');

const getAllProducts = () => 
  connection().then((db) => db.collection('products').find().toArray());

const createProduct = (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = {
  getAllProducts,
  createProduct,
};
