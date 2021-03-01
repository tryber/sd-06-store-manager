const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (array) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: array}));
};

const getById = async (id) => {
  if(id) {
    return await connection()
      .then((db) => db.collection('sales').findOne(ObjectId(id)));
  }
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const change = async(id, array) => {
  return await connection().then((db) => db.collection('sales')
    .updateOne({ _id: id }, { $set: { itensSold: array } }));
};

module.exports = {
  create,
  getById,
  change
};
