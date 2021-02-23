const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
};
