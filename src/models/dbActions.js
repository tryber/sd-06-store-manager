const connection = require('./connection');
//const { ObjectId } = require('mongodb')

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result);

module.exports = {
  getAll,
  create
};
