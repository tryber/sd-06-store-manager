const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (product) => {
  const { name, quantity } = product;
  return await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
};
const findByName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').find({ name: { $eq: name } }).count());
};
const ProductList = async () => {
  return await connection().then((db) =>
    db.collection('products').find().toArray());
};
const findById = async (id) => {
  return await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  createProduct,
  findByName,
  ProductList,
  findById
};
