const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const create = async (products) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }));
  
  return {
    _id: insertedId,
    itensSold: products,
  };
};

module.exports = {
  getAll,
  create,
};
