const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSales = async (sales) => await connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sales }));

const getAllSales = async () => await connection()
  .then((db) => db.collection('sales').find().toArray());

const findById = async (id) => await connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSale = async (id, itensSold) => await connection()
  .then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } }
  ));

module.exports = {
  insertSales,
  getAllSales,
  findById,
  updateSale,
};
