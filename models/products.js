const { ObjectID, ObjectId } = require('mongodb');
const { get } = require('../controller/controllerProduct');
const getConnection = require('./connection');

const createProduct = async (name, quantity) => getConnection('products')
  .then((db) => db.insertOne({ name, quantity }))
  .then((res) => ({ _id: res.insertedId, name, quantity }));
  
const getProductsByName = async (name) => getConnection('products')
  .then((db) => db.findOne({ name }));

const getAllProducts = async () => getConnection('products')
  .then((db) => db.find().toArray());

const getProductById = async (id) => getConnection('products')
  .then((db) => db.findOne(ObjectID(id)));

const deleteProduct = async (id) => getConnection('products')
  .then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createProduct,
  getProductsByName,
  getAllProducts,
  getProductById,
  deleteProduct,
};
