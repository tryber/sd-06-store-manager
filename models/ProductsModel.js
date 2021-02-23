const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ firstName, middleName, lastName }));

module.exports = {
  create,
}