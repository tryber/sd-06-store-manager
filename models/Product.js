const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  if(id) {
    return await connection()
      .then((db) => db.collection('products').findOne(ObjectId(id)));
  }
  return await connection().then((db) => db.collection('products').find().toArray());
};

const findByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  getById,
  findByName,
  create
};
