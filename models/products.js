const connection = require('./connection');
const mongo = require('mongodb');

const coll = 'products';

const insertProduct = async (name, quantity) => {
  await connection().then((db) => db.collection(coll).insertOne({ name, quantity }));
  const info = await connection()
    .then((db) => db.collection(coll).findOne({ name }));

  return { code: 'ok', info }; 
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection(coll).find().toArray());
};

const getByName = async (name) => {
  return await connection()
    .then((db) => db.collection(coll).findOne({ name }));
};

const getById = async (id) => {
  return await connection()
    .then((db) => db.collection(coll).findOne({ _id: mongo.ObjectId(id) }));
};

const updateOne = async (id, name, quantity) => {
  const { value } = await connection().then((db) => db.collection(coll).findOneAndUpdate(
    { _id: mongo.ObjectID(id) },
    { $set: { name, quantity } },
    { returnOriginal: false }
  ));

  return value;
};

const deleteOne = async (id) => {
  const { value } = await connection().then((db) => db.collection(coll).findOneAndDelete(
    { _id: mongo.ObjectID(id) },
    { returnOriginal: false }
  ));

  return value;
};

module.exports = {
  insertProduct,
  getAll,
  getByName,
  getById,
  updateOne,
  deleteOne,
};
