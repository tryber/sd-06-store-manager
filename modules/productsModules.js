const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = () => 
  connection().then((db) => db.collection('products').find().toArray());

const createProduct = (data) =>
  connection().then((db) => db.collection('products').insertOne(data));

const getProductById = (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
