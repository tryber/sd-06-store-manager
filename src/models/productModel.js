const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria um produto
const createProductModels = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

// Acha um produto pelo nome
const findProductByNameModels = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

// Lista todos os produtos
const getAllProductModels = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

// Lista produtos por ID
const getProductByIdModels = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  createProductModels,
  findProductByNameModels,
  getAllProductModels,
  getProductByIdModels,
};
