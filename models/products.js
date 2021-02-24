const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const createProduct = async (name, quantity) => connectionDB('products')
  .then((db) => db.insertOne({ name, quantity }))
  .then((res) => ({ _id: res.insertId, name, quantity }));
  
const getProductsByName = async (name) => connectionDB('products')
  .then((db) => db.findOne({ name }));
  
module.exports = {
  createProduct,
  getProductsByName,
};
