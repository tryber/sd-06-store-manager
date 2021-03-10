const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSales = async (itensSold) => {
  const { insertedId } = await connection().then((db) => db.collection('sales')
    .insertOne({itensSold}));
  return ({_id: insertedId, itensSold});
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getByIdSales = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .findOne({_id: ObjectId(id) }));
};

const updateSales = async (id, itensSold) => {
  await connection().then((db) => db.collection('sales').updateOne(
    db.collection('sales').findOne({_id: ObjectId(id) }),
    {$set:{ itensSold }}
  ));
};

const removeSales = async (id) => {
  return await connection().then((db) => db.collection('sales')
    .deleteOne({_id: ObjectId(id) }));
};


module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
  updateSales,
  removeSales
};
