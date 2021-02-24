const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return {_id: product.insertedId, name, quantity }; 
};

const findNameProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productById = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  return productById;
};

module.exports = {
  create,
  findNameProduct,
  getAll,
  getById,
};
