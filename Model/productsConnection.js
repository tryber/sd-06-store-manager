const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const creation = connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return creation;
};

const getAllProducts = async () => {
  connection().then((db) => db.collection('products').find().toArray())
    .then((products) => {
      products.map(({ _id, name, quantity }) => ({
        id: _id,
        name,
        quantity,
      }));
    });
};

const getByName = async (name) => {
  const getName = connection().then((db) => db.collection('products').findOne({name}));
  return getName;
};

const getById = async (id) => {
  const getId = connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  return getId;
};

module.exports = {
  create,
  getAllProducts,
  getByName,
  getById,
};
