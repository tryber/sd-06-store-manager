const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const createProduct = async (name, quantity) => getConnection('products')
  .then((db) => db.insertOne({ name, quantity }))
  .then((res) => ({ _id: res.insertedId, name, quantity }));
  
const getProductsByName = async (name) => getConnection('products')
  .then((db) => db.findOne({ name }));
  
module.exports = {
  createProduct,
  getProductsByName,
};
