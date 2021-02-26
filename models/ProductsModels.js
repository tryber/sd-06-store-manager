const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerProduct =  (productInfo) => connection()
  .then((db) => db.collection('products').insertOne(productInfo));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
};
