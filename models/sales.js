const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const findById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const findByName = async(productName) => 
  connection().then((db) => db.collection('sales').findOne({ name: productName }));

const create = async (sale) =>
  connection()
    .then((db) =>
      db.collection('sales').insertOne(sale)
    )
    .then((result) => result);

const update = async (id, newSale) =>
  connection()
    .then((db) => db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: {
        itensSold: newSale,
      } },
      { returnOriginal: false },
    ))
    .then((result) => result.value);

const deleteSale = async (id) => 
  connection()
    .then((db) => db.collection('sales').findOneAndDelete(
      { _id: ObjectId(id) },
    ))
    .then((result) => result.value);

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteSale,
};