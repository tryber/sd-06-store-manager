const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const productByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const listProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const productById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id) }));
};

module.exports = {
  createProduct,
  productByName,
  listProducts,
  productById
};