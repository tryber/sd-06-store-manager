const connection = require('../database');
const { ObjectId } = require('mongodb');

const createProduct = async ({ name, quantity }) => {
  const newProduct = connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return newProduct;
};

module.exports = {
  createProduct
};
