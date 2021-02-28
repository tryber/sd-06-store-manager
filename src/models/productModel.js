const connection = require('../database/connection');
// const { ObjectId } = require('mongodb');
const collection = 'products';
// const { throwError } = require('../errorHandler/errorHandler');
// const { status, errorMessages } = require('../utils/status');

const createProduct = async (name, quantity) => {
  const createdProduct = await connection().then((db) =>
    db.collection(collection).insertOne({ name, quantity }),
  );

  return createdProduct;
};

const getByName = async (name) => {
  const product = await connection().then((db) =>
    db.collection(collection).findOne({ name }),
  );

  return product;
};

module.exports = { createProduct, getByName };
