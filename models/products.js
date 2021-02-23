const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return {_id: product.insertedId, name, quantity }; 
};

const findNameProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  create,
  findNameProduct
};
