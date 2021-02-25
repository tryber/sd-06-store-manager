const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const salesObject = { itemsSold: sale }

  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(salesObject));

  return {
    _id: insertedId,
    ...salesObject
  };  
};

const getAll = async () => {
  return await connection().then((db => db.collection('sales')
    .find().toArray()));
};

const findById = async (id) => {
  return await connection().then((db => db.collection('sales')
    .findOne({ _id: ObjectId(id) })));
};

module.exports = {
  create,
  getAll,
  findById
};
