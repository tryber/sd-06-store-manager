const connection = require('./connection');

const createProduct = async (product) => {
  const { name, quantity } = product;
  return await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
};
const findByName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').find({ name: { $eq: name } }).count());
};

module.exports = {
  createProduct,
  findByName
};
