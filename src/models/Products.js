const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const getAll = async () => {
  return await connection().then((db) => db.collection(collection).find().toArray());
};

const findItem = async (nameToSearch) => {
  return await connection().then((db) => db.collection(collection)
    .find({ name: nameToSearch }).toArray());
};

const insertProduct = async (name, qnt) => {
  return await connection().then((db) => db.
    collection(collection).insertOne({ name, quantity: qnt }));
};

module.exports = {
  getAll,
  findItem,
  insertProduct,
};
