const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find({}).toArray());
};

const getSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const addSale = async (product) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: product }));
};

const updateSale = async (id, productId, quantity) => {
  if (ObjectId.isValid(id)) {
    return connection()
      .then((db) => db.collection('sales').updateOne(
        { _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } },
      ));
  }
};

const deleteSale = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection()
      .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};