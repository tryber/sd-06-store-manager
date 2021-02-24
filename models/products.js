const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return await connection().then(db => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne({name}));
};

const findById = async (id) => {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
};

const update = async (id, name, quantity) => {
  return await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));
};

const remove = async (id) => {
  return await connection().then(db => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  createProduct,
  findByName,
  findById,
  update,
  remove,
};
