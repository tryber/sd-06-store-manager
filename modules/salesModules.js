const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (data) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));
  const { insertedId } = sale;
  return {
    _id: insertedId,
    itensSold: data,
  };
};

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const editSale = async (id, data) => await connection()
  .then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: data } },
  ));

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  editSale,
};
