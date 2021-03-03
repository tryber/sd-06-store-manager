const  { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const createSale = async (data) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: data }));
  const {insertedID } = sale;
  return {
    _id: insertedID,
    itensSold: data,
  };
};

const getById = async (id) =>
  connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

const update = async (id, data) =>
  connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { intesSold: data } }));


module.exports = {
  getAll,
  createSale,
  getById,
  update,
};
