const connection = require('./connection');

const create = async (name, quantity) => {
  const creation = connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return creation;
};

const getAll = async () => {
  const all = connection().then((db) => db.collection('products').find().toArray())
    .then((products) => {
      products.map(({ _id, name, quantity }) => ({
        id: _id,
        name,
        quantity,
      }));
    });
  return all;
};

const getByName = async (name) => {
  const getName = connection().then((db) => db.collection('products').findOne({name}));
  return getName;
};

module.exports = {
  create,
  getAll,
  getByName,
};
