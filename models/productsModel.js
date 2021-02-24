const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAll = async () => await connection()
  .then((db) => db.collection('products').find().toArray());

const findById = async (id) => await connection()
  .then((db) => db.collection('products').findOne(ObjectID(id)));

const addProduct  = async (product) => await connection()
  .then((db) => db.collection('products').insertOne(product));

const nomeJaExiste  = async (name) => await connection()
  .then((db) => db.collection('products').find({ name: name },{ _id: 1 }).toArray());

module.exports = {
  getAll,
  findById,
  addProduct,
  nomeJaExiste,
};
