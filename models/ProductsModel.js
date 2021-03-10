const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProducts = async (data) => {
  return await connection().then((db) =>
    db.collection('products').insertOne(data),
  );
};

const getByNameProducts = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

const getAllProducts = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const getByIdProducts = async (id) => {
  return await connection().then((db) => db.collection('products')
    .findOne({ _id: ObjectId(id) }));
};

const updateProducts = async (id, name, quantity) => {
  return await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

const removeProducts = async (id) => {
  return await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }),
  );
};

module.exports = {
  getByNameProducts,
  createProducts,
  getAllProducts,
  getByIdProducts,
  updateProducts,
  removeProducts,
};
