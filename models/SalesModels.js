const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const registerSale = async (saleInfo) => {
  const sale =  await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold: saleInfo }));

  const { insertedId } = sale;

  return {
    _id: insertedId,
    itensSold: saleInfo,
  };
};

const getSaleById = (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = (id, saleInfo) =>
  connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: saleInfo }}));

module.exports = {
  getAllSales,
  registerSale,
  getSaleById,
  updateSale,
};