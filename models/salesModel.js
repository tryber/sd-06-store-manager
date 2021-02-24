const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const create = async (data) => {
  const sale =  await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold: data }));
  const { insertedId } = sale;
  return {
    _id: insertedId,
    itensSold: data,
  };
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .findOne({_id: ObjectId(id) }));
};

const update = async (id, data) => {
  return await connection().then((db) => db.collection('sales')
    .updateOne({
      _id: ObjectId(id)
    }, {
      $set: { itensSold: data } 
    }));
};

const remove = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
