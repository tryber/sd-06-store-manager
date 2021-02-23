const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const createProduct = (data) => connection()
  .then((db) => db.collection('products').insertOne(data));

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
