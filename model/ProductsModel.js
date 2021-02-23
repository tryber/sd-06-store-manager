const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findProductByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const findAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const findProductById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id) }));
};

module.exports = {
  createProduct,
  findProductByName,
  findAllProducts,
  findProductById
};
