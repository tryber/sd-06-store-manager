const connection = require('./connection');

const coll = 'products';

const insertProduct = async (name, quantity) => {
  await connection().then((db) => db.collection(coll).insertOne({ name, quantity }));

  return await connection().then((db) => db.collection(coll).findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection(coll).find().toArray());
};

const getByName = async (name) => {
  return await connection()
    .then((db) => db.collection(coll).findOne({ name }));
};

module.exports = {
  insertProduct,
  getAll,
  getByName,
};
