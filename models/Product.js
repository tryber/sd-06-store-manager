// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getAll = async () => {
//   return await connection().then((db) => db.collection('users').find().toArray());
// };

const findByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  // getAll,
  findByName,
  create
};
