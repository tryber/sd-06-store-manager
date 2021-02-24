const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const create = async (name, quantity) => {
  return await connection().then(db => 
    db.collection('products').insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({ name }));
};

// 2
const getById = async (id) => {
  return await connection().then(db => 
    db.collection('products').findOne({ _id: ObjectId(id) }));
};
// 2 

module.exports = {
  getAll,
  create,
  getByName,
  getById
};