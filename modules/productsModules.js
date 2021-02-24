const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = () => 
  connection().then((db) => db.collection('products').find().toArray());

const createProduct = (data) =>
  connection().then((db) => db.collection('products').insertOne(data));

const getProductById = (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectId(id)));

const updateProduct = (id, name, quantity) =>
  connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));

const deleteProduct = (id) =>
  connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
