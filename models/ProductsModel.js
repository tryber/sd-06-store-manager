const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => 
  await connection()
    .then(db => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity}) => ({
        _id,
        name,
        quantity,
      }))
    );

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

const getById = async (name) => {
  return await connection()
    .then(db => db.collection('products').findOne({ ObjectId }));
};

module.exports = {
  createProduct,
  getAllProducts,
  getByName,
  getById,
};
