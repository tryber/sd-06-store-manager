const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  await connection().then((db) => {
    db.collection('products').insertOne({ name, quantity });
  });

  const createdProduct = await connection().then((db => db.collection('products')
    .findOne({ name: name })));

  return createdProduct;
};

const getAll = async () => {
  return await connection()
    .then((db => db.collection('products').find().toArray()));
};

const findById = async (id) => {
  return await connection().then((db => db.collection('products')
    .findOne({ _id: ObjectId(id) })));
};

const updateById = async (id, name, quantity) => {
  await connection().then((db => db.collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: {
        name,
        quantity
      }}
    )));

  const updatedProduct = await connection().then((db => db.collection('products')
    .findOne({ name: name })));

  return updatedProduct;
};

const deleteById = async (id) => {
  const deletedProduct = await connection().then((db => db.collection('products')
    .findOne({ _id: ObjectId(id) })));

  await connection().then((db => db.collection('products')
    .deleteOne({ _id: ObjectId(id) })));

  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById
};
