const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getProductCount = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').count({name}));
  return result;
};

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return ({_id: insertedId, name, quantity});
};

const getAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id) }));
  return product;

};

const updateProduct = async (id, name, quantity ) => {
  const product = await connection()
    .then((db) => db.collection('products').updateOne(
      db.collection('products').findOne({_id: ObjectId(id) }),
      {$set:{ name, quantity }},));
  return product;
};

const deleteProduct = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').deleteOne({_id: ObjectId(id) }));
  return product;
};

module.exports = {
  createProduct,
  getProductCount,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};