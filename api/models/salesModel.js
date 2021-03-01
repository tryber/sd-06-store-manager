const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const registerManySales = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}))
    .then((result) => result)
    .catch((err) => console.error(err));
};

module.exports = {
  registerManySales,
};


