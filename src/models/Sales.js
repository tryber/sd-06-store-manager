const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
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
  findById,
};
