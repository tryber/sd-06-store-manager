const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (itensSold) => {
  return await connection().then((db) => db.collection('sales')
    .insertOne({itensSold}).then((item) => ({_id: item.insertedId, itensSold})));
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getSaleById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, sale) => {
  return await connection().then((db) => db.collection('sales').updateOne(
    {_id: ObjectId(id)},
    { $set: {itensSold: sale}}
  ));
};

const deleteSale = async (id) => {
  return await connection().then((db) => db.collection('sales').deleteOne(
    { _id: ObjectId(id)}
  ));
};

// criar uma query que busque no banco determinado documento a partir do nome
const findByName = async (name) => {
  return await connection().then((db) => db.collection('sales').findOne({name}));
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  findByName,
};
