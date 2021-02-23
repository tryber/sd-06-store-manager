const connection = require('./connection');
const { ObjectId } = require('mongodb');
const dbCollection = 'products';
const { throwError } = require('../errorHandler/errorHandler');
const {status, errorMessages} = require('../errorHandler/utils/status');

const registerProduct = async (name, quantity) => {
  const insertedObject = await connection().then((db) => 
    db
      .collection(dbCollection)
      .insertOne({name, quantity})
  );

  return insertedObject;
};

const findByName = async (name) => {
  const product = await connection().then((db) => 
    db
      .collection(dbCollection)
      .findOne({name})
  );

  return product;
};

const getAll = async () => {
  const products = await connection().then((db) =>
    db
      .collection(dbCollection)
      .find()
      .toArray()
  );

  return products;
};

const findById = async (id) => {
  const product = await connection().then((db) =>
    db
      .collection(dbCollection)
      .findOne({_id: ObjectId(id)})
  ).catch(err => {
    throw new throwError(status.unprocessableEntity, errorMessages.wrongId);
  });

  return product;
};

const updateProduct = async (name, quantity, id) => {
  const updatedProduct = await connection().then((db) => {
    db
      .collection(dbCollection)
      .updateOne(
        {_id: ObjectId(id)},
        {$set: {name, quantity}}
      );
  });
  return updatedProduct;

};

module.exports = {
  registerProduct,
  findByName,
  getAll,
  findById,
  updateProduct,
};