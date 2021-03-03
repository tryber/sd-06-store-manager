const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (product) => connection()
  .then((db) => db.collection('products').insertOne(product));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProduct = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
};
