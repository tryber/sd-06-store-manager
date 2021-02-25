const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async() => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getProductById = async(id) => {
  const db = await connection();
  return db.collection('products').findOne({_id: ObjectId(id)});
};

const createProduct = async(name, quantity) => {
  const db = await connection();
  return db.collection('products').insertOne({name, quantity});
  
};


const getProductByName = async(name) => {
  const db = await connection();
  return await db.collection('products').findOne({name});
};


module.exports = {
  getAll,
  createProduct,
  getProductByName,
  getProductById
};
