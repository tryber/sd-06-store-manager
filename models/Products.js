const connection = require('./Connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getByName = async (parameter) => {
  return await connection()
    .then((db) => db.collection('products').find({ parameter }).toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  create,
  getByName,
  getAll,
  findById
};
