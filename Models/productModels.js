const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  await connection().then((db) => {
    db.collection('products').insertOne({ name, quantity });
  });

  const createdProduct = await connection().then((db => db.collection('products')
    .findOne({ name: name })));

  return createdProduct;
};

const getAll = async () => {
  return await connection()
    .then((db => db.collection('products').find().toArray()));
};

const findById = async (id) => {
  return await connection().then((db => db.collection('products').findOne({ _id: ObjectId(id) })));
};

module.exports = {
  create,
  getAll,
  findById
};
