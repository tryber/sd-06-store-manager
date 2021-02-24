const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const findById = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectId(id)));

const findByName = async(productName) => 
  connection().then((db) => db.collection('products').findOne({ name: productName }));

const create = async (product) =>
  connection()
    .then((db) =>
      db.collection('products').insertOne(product)
    )
    .then((result) => result);

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};