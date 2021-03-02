const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const data = await connection().then(db => db.collection('products').find().toArray());
  return { products: data };
};
const getById = async (id) => {
  return await connection().then(db => db.collection('products')
    .findOne({ _id: ObjectId(id) }));
};
const update = async (id, name, quantity) => {
  await connection().then(db => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return {
    _id: id,
    name,
    quantity
  };
};
const remove = async (id) => {
  return await connection().then(db => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
};
const create = async (name, quantity) => {
  const { insertedId } = await connection().then(db => db.collection('products')
    .insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
