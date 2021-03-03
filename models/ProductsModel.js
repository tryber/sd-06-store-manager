const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  return await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }));
};

const getByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('products')
    .findOne({_id: ObjectId(id)}));
};

const update = async (id, name, quantity) => {
  return await connection().then((db) =>db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

const remove = async (id) => {
  return await connection().then((db) => db.collection('products')
    .deleteOne({_id: ObjectId(id) }));
};

module.exports = {
  getByName,
  create,
  getAll,
  getById,
  update,
  remove
};
