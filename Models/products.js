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

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) => {
      db.collection('products')
        .updateOne({ _id: Object(id) }, { $set: {name, quantity} });
    });
};

const deleteProduct = async (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  createProduct,
  productByName,
  listProducts,
  productById,
  updateProduct,
  deleteProduct
};