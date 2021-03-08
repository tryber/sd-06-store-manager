const connection = require('../models/connection');
const { ObjectId } = require('mongodb');


const createProduct = async ( name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne(
    { name, quantity }
  ));
};

const findProductByName = async (nome) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name: nome }));
};

module.exports = {
  createProduct,
  findProductByName
};
