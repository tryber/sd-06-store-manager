const connection = require('./connection');

const getAllProducts = async () => connection().then((db) => db.collection('products').find().toArray());

const createProduct = (data) => connection().then((db) => db.collection('products').insertOne(data));

module.exports = {
  getAllProducts,
  createProduct,
}
