const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerProduct =  (productInfo) => connection()
  .then((db) => db.collection('products').insertOne(productInfo));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const editProduct = async (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

const deleteProduct = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
