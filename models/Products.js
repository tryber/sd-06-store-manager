const connection = require('./connection');

const insertProduct = async (name, quantity) => await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const getAllProducts = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

module.exports = {
  insertProduct,
  getAllProducts,
};
