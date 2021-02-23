const connection = require('./Connection');
const { ObjecId } = require('mongodb');

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').find({ name }).toArray());
};

module.exports = {
  create,
  getByName
};
