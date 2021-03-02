const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const registerManySales = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}))
    .then((result) => result)
    .catch((err) => console.error(err));
};

const findAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((res) => res)
    .catch((err) => console.error(err));
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .then((res) => res)
    .catch((err) => err);
};

const updateSale = async (id, arraySales) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      {_id: ObjectId(id)},
      { $set:{itensSold: [arraySales]}}
    ))
    .then((res) => res)
    .catch((err) => console.error(err));
};

const deleteSale = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOneAndDelete(
      {_id: ObjectId(id)}
    ))
    .then((res) => res)
    .catch((err) => console.error(err));
};

module.exports = {
  registerManySales,
  findAllSales,
  findById,
  updateSale,
  deleteSale,
};
