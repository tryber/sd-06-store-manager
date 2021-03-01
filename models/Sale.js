const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (array) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: array}));
};

module.exports = {
  create
};
