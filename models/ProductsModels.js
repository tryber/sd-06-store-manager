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
    { $set: { name: name, quantity: quantity } }
  ));

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
  editProduct,
};
