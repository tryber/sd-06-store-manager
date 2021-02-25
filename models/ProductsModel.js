const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () =>
  await connection()
    .then(db => db.collection('products').find().toArray());

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
  };
};

const getByName = async (name) => {
  return await connection()
    .then(db => db.collection('products').findOne({ name }));
};

const getById = async (id) => {
  return await connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  createProduct,
  getAllProducts,
  getByName,
  getById,
};
