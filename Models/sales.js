const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const saleObject = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }));
  const { insertedId } = saleObject;
  return {
    _id: insertedId,
    itensSold: sale,
  };
};

const listSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const saleById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, itensSold) => {
  return connection()
    .then((db) => {
      db.collection('sales')
        .updateOne({ _id: ObjectId(id) }, { $set: {itensSold} });
    });
};

module.exports = {
  createSale,
  listSales,
  saleById,
  updateSale
};