const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const COLLECTION = 'products';

const getAll = async () => {
  return await connection().then((db) => db.collection(COLLECTION).find().toArray());
};

const createNewProduct = async (name, quantity) => {
  const { insertedId } =
    await connection()
      .then((db) => db.collection(COLLECTION)
        .insertOne({ name, quantity }));

  return {
    id: insertedId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  return await connection().then((db) => db.collection(COLLECTION).findOne({ name }));
};

module.exports = {
  getAll,
  createNewProduct,
  getByName,
};
