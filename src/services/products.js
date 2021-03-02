const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity }) => {
        return {
          _id,
          name,
          quantity,
        };
      }
      )
    );
};

const findById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch(err => err.message);

  if (!product || typeof product !== 'object') return null;

  return product;
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const update = async (id, name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { "name": name, "quantity": quantity } }));
};

const deleteProduct = async (id) => {
  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct
};