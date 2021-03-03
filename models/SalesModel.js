const connection = require('./connection');
const { ObjectId } = require('mongodb');


const create = async (itensSold) => {
  return await connection().then((db) => db.collection('sales')
    .insertOne({itensSold}).then((item) => ({_id: item.insertedId, itensSold})));
};

const getAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .findOne({_id: ObjectId(id) }));
};

const update = async (id, itensSold) => {
  await connection().then((db) => db.collection('sales').updateOne(
    db.collection('sales').findOne({_id: ObjectId(id) }),
    {$set:{ itensSold }}
  ));
};

const remove = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .deleteOne({_id: ObjectId(id) }));
};


module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
