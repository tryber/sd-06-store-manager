const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  if(id) {
    return await connection()
      .then((db) => db.collection('products').findOne(ObjectId(id)));
  }
  return await connection().then((db) => db.collection('products').find().toArray());
};

const change = async (id, name, quantity) => {
  return await connection().then((db) => db.collection('products')
    .updateOne({ _id: id }, { $set: { name, quantity } }));
};

const findByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const deleteProduct = async (id) => {
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getById,
  findByName,
  create,
  change,
  deleteProduct
};
