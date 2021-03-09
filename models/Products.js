const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => 
  await connection()
    .then((db) => 
      db.collection('products').insertOne({ name, quantity }));

const getProducts = async () => 
  await connection()
    .then((db) => 
      db.collection('products').find().toArray());

const getById = async (id) =>  
  await connection()
    .then((db) => 
      db.collection('products').findOne(ObjectId(id)));

module.exports = {
  addProduct,
  getProducts,
  getById,
};
s