const connection = require('./connection');
const { ObjectId } = require('mongodb');

const COLLECTION = 'sales';

const registerSale = async (itensSold) => {
  return await connection().then((db) => db.collection(COLLECTION)
    .insertOne({itensSold})
    .then((item) => ({
      _id: item.insertedId,
      itensSold
    }))
  );
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection(COLLECTION).find().toArray());
};

const getById = async (id) => {
  return await connection().then((db) => db.collection(COLLECTION).findOne(ObjectId(id)));
};

module.exports = {
  registerSale,
  getAllSales,
  getById,
};
