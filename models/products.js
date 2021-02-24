const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return await connection().then(db => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({name}));
};

const findById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

module.exports ={
  getAll,
  createProduct,
  findByName,
  findById
};
