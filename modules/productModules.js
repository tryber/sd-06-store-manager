const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const createProduct = (data) => connection()
  .then((db) => db.collection('products').insertOne(data));

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const editProduct = async (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name: name, quantity: quantity } }
  ));

const deleteProduct = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
};
