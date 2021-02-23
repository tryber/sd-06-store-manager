const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products')
    .insertOne({ name, quantity }))
    .then((result) => result);

const getAll = async () => {
  return await connection().then((db) =>db.collection('products').find().toArray());
};

const getById = async (id) => {
  const product = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  if (product) return null;
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
}