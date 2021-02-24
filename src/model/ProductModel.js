const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (product) => {
  const { name, quantity } = product;

  return await connection().then((db) => db
    .collection('products')
    .insertOne({ name, quantity }));
};

const findAllProducts = async () => {
  return await connection().then((db) => db
    .collection('products')
    .find()
    .toArray()
  );
};

const findProductById = async (id) => {
  return await connection().then((db) => db
    .collection('products')
    .findOne({ _id: ObjectId(id) })
  );
};

const findProductByName = async (name) => {
  return await connection().then((db) => db
    .collection('products')
    .find({ name })
    .toArray()
  );
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  findProductByName,
};
