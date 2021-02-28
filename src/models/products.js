const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity }) =>
      // getNewProduct({
      {
        return {
          _id,
          name,
          quantity,
        };
      }
        // })
      )
    );
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  getAll,
  create,
};