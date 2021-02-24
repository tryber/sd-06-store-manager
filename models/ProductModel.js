const connection = require('./connection');
const {ObjectId} = require('mongodb');

const getProductCount = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').count({name}));
  return result;
};

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return ({_id: insertedId, name, quantity});
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());
  return result;
};

const getProductById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id) }));
  return result;
};
module.exports = {
  create,
  getProductCount,
  getAll,
  getProductById,
};