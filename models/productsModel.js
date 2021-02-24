const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { database } = require('faker');

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const create = async (data) => {
  return await connection().then((db) => db.collection('products').insertOne(data));
};

const getByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const update = async (id, data) => {
  return await connection().then((db) => db.collection('products')
    .updateOne({
      _id: ObjectId(id)
    }, {
      $set: { name: data.name, quantity: data.quantity }
    }));
};

const remove = async (id) => {
  return await connection().then((db) => db.collection('products')
    .deleteOne(ObjectId(id)));
};

module.exports = {
  getAll,
  create,
  getByName,
  getById,
  update,
  remove,
};
