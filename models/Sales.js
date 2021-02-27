const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('sales').find().toArray());
};

const create = async (itensSold) => {
  return await connection().then(db => 
    db.collection('sales').insertOne({ itensSold }));
};

// 6
const getById = async (id) => {
  return await connection().then(db => 
    db.collection('sales').findOne({ _id: ObjectId(id) }));
};
// 6

module.exports = {
  getAll,
  create,
  getById,
};